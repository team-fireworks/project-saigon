export type Task = Instance | RBXScriptConnection | Callback | thread | Task[] | unknown;

export class TaskManager {
	private tasks: Task[];

	constructor() {
		this.tasks = [];
	}
}
