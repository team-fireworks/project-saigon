import { Flamework } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import { panic } from "server/result";
import { flameworkIgnited } from "shared/flamework";
import { RobloxLogger, setDefaultLogger, trace } from "shared/utils/log";

setDefaultLogger(
	new RobloxLogger({
		aliases: { "ServerScriptService/tftServer": "server", "ReplicatedStorage/tftShared": "shared" },
	}),
);

const isServerIgnited = ReplicatedStorage.WaitForChild<BoolValue>("isServerIgnited");

try {
	Flamework.addPaths("src/server/services");

	trace("server igniting");
	Flamework.ignite();
	flameworkIgnited();
	isServerIgnited.Value = true;
	trace("server ignited");
} catch (e) {
	panic(`ignition failed: ${e}`);
}
