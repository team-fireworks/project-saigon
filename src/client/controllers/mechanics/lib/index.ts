import { OnInit, OnStart, Service } from "@flamework/core";
import { trace } from "shared/utils/log";

export interface Mechanic {
	tag: string;
	implement: () => void;
	modelCheck?: () => void;
}

export interface MechanicConstructorProps {
	tag: string;
	implement: () => void;

	modelCheck?: () => void;
}

export interface MechanicLib {
	createMechanic: (props: MechanicConstructorProps) => undefined;
}

let GET_MECHANICS_LIB_FUNCTION = game.FindFirstChild("GetMechanicLib");
if (!GET_MECHANICS_LIB_FUNCTION) {
	const fn = new Instance("BindableFunction");
	fn.Name = "GetMechanicLib";
	fn.Parent = game;
	GET_MECHANICS_LIB_FUNCTION = fn;
}

@Service()
export class MechanicLibController implements OnInit, OnStart {
	private moduleToLib!: Map<ModuleScript, MechanicLib>;

	constructor() {}

	onInit(): void | Promise<void> {
		this.moduleToLib = new Map();
	}

	onStart(): void {
		const moduleToLib = this.moduleToLib;

		function onInvoke(): MechanicLib {
			const env = getfenv(2);
			const thisScript = env.script as ModuleScript;
			if (!moduleToLib.has(thisScript)) throw `no lib registered for ${thisScript.GetFullName()}`;
			const lib = moduleToLib.get(thisScript)!;
			trace(`script ${thisScript.GetFullName()} requested mechanics lib`);
			return lib;
		}

		GET_MECHANICS_LIB_FUNCTION.OnInvoke = () => onInvoke;
	}

	createLib(module: ModuleScript) {
		if (this.moduleToLib.has(module)) throw `already created lib for ${module.GetFullName()}`;
		this.moduleToLib.set(module, {
			createMechanic: (props) => {
				print(props);
				return undefined;
			},
		});
		module.Destroying.Once(() => this.moduleToLib.delete(module));
	}
}
