import { Players } from "@rbxts/services";
import { err } from "shared/utils/log";

export class Error {}

function panicKick(player: Player, message: string) {
	player.Kick(
		`The server panicked: ${message}.\nThis is a bug in Total Fire Towers.\nPlease file a bug report in the community server`,
	);
}

// use in the most dire of situations
export function panic(message: string) {
	err(`server panicked: ${message}`);
	task.spawn(() => {
		for (const p of Players.GetPlayers()) panicKick(p, message);
		Players.PlayerAdded.Connect((p) => panicKick(p, message));
	});
}
