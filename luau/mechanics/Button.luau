--!strict

local Types = require(game.ReplicatedStorage.Types)
local lib = game.GetMechanicLib:Invoke()() :: Types.MechanicLib

return lib.createMechanic {
	tag = "std.Button",
	implement = function(self, t)
		print("button", self, "task", t)
	end,
}
