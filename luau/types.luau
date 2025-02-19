export type TaskManager = {
	push: <Tasks...>(self: TaskManager, Tasks...) -> Tasks...,
	pop: (self: TaskManager) -> unknown,
	remove: <Tasks...>(self: TaskManager, Tasks...) -> Tasks...,
	destroy: (self: TaskManager) -> (),
	isDestroyed: (self: TaskManager) -> boolean,

	createInstance: (self: TaskManager, name: string) -> (props: { [string]: unknown }) -> Instance,
	spawnThread: <Args...>(self: TaskManager, callback: (Args...) -> (), Args...) -> thread,
	delayThread: <Args...>(self: TaskManager, delaySeconds: number, callback: (Args...) -> (), Args...) -> thread,
	createTaskManager: (self: TaskManager) -> TaskManager,
}

export type Tower = {
	mechanicFolder: Instance,
	obbyFolder: Instance,
	detailFolder: Instance,

	currentPlayers: () -> { Player },
}

export type Mechanic<Attributes> = {
	tag: string,
	id: number,
	instance: Instance,
	tower: Tower,
	attributes: Attributes,
}

export type MechanicConstructerProps<Attributes = { [unknown]: unknown }> = {
	tag: string,
	attributes: Attributes?,
	modelCheck: nil | () -> (),
	implement: (self: Mechanic<Attributes>, tasks: TaskManager) -> (),
}

--- MechanicLib
---
--- The entry point to Total Fire Towers and it's Mechanic API. Every
--- modules in the Mechanics folder can request the game for it's specific
--- MechanicLib. Mechanics can then be registered with the library's
--- `createMechanic` method.
---
--- ```Luau
--- -- import types
--- local Types = require(game.ReplicatedStorage.Types)
--- -- invoke the client for the mechanic lib
--- local lib = game.GetMechanicLib:Invoke()() :: Types.MechanicLib
---
--- return lib.createMechanic {
---     -- specify it's CollectionService tag
---	    tag = "std.Button",
---     -- implement the mechanic
---	    implement = function(self, t)
---		    print("button", self, "task", t)
---	    end,
--- }
--- ```
export type MechanicLib = {
	instances: {
		playerTouched: (thisPart: BasePart, otherPart: BasePart) -> boolean,
		boxTouched: (thisPart: BasePart, otherPart: BasePart) -> boolean,
		bulletTouched: (thisPart: BasePart, otherPart: BasePart) -> boolean,
	},

	assert: {
		playerTouched: (thisPart: BasePart, otherPart: BasePart) -> (),
		boxTouched: (thisPart: BasePart, otherPart: BasePart) -> (),
		bulletTouched: (thisPart: BasePart, otherPart: BasePart) -> (),
	},

	memory: {
		--- Creates a new TaskManager. When the current Tower is unloaded, all
		--- TaskManagers are destroyed.
		createTaskManager: () -> TaskManager,
		destroy: (...unknown) -> (),
	},

	--- Registers a new Mechanic. When a Tower is loaded, all Mechanics of the
	--- specified CollectionService tag will have the Mechanic implemented.
	createMechanic: <C>(props: MechanicConstructerProps<C>) -> nil,
}

return nil
