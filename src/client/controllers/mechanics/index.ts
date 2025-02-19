import { OnInit, Service } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { ReplicatedStorage } from "@rbxts/services";
import { Mechanic, MechanicLibController } from "client/controllers/mechanics/lib";
import { trace } from "shared/utils/log";

const MECHANIC_FOLDER = ReplicatedStorage.WaitForChild<Folder>("Mechanics");

@Service()
export class MechanicController implements OnInit {
	mechanics!: Set<Mechanic>;
	tagToMechanic!: ReadonlyMap<string, Mechanic>;

	constructor(private libController: MechanicLibController) {}

	onInit(): void | Promise<void> {
		this.mechanics = new Set();

		print("HEYYY");
		print(MECHANIC_FOLDER, MECHANIC_FOLDER.GetDescendants());
		for (const m of MECHANIC_FOLDER.GetDescendants()) {
			trace(`got module ${m.GetFullName()}`);
			if (!classIs(m, "ModuleScript")) continue;
			trace(`registering module ${m.GetFullName()}`);
			this.libController.createLib(m);
			const mod = require(m);
			print(mod);
		}

		this.tagToMechanic = new ReadonlyMap(Object.keys(this.mechanics).map((m) => [m.tag, m]));
	}

	loadMechanics() {
		throw "unimplemented";
	}

	unload() {
		throw "unimplemented";
	}
}
