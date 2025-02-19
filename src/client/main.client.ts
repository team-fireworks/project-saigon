import { Flamework } from "@flamework/core";
import { flameworkIgnited } from "shared/flamework";
import { err, RobloxLogger, setDefaultLogger, trace } from "shared/utils/log";

setDefaultLogger(
	new RobloxLogger({
		aliases: { "ReplicatedStorage/ocmClient": "client", "ReplicatedStorage/ocmShared": "shared" },
	}),
);

try {
	Flamework.addPaths("src/client/controllers");

	trace("client igniting");
	Flamework.ignite();
	flameworkIgnited();
	trace("client ignited");
} catch (e) {
	err(`client failed to ignite: ${e}`);
}
