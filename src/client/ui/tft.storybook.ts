import { ReplicatedStorage } from "@rbxts/services";
import { Storybook } from "@rbxts/ui-labs";

const storybook: Storybook = {
	name: "Total Fire Towers",
	storyRoots: ReplicatedStorage.WaitForChild("tftClient").GetDescendants(),
	groupRoots: false,
};

export = storybook;
