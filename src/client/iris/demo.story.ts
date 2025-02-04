import Iris, { ShowDemoWindow } from "@rbxts/iris";

export = {
	iris: Iris,
	story: () => Iris.Connect(ShowDemoWindow),
};
