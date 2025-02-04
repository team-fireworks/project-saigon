interface SingleValue<T> {
	// required to differentiate from no value and nil
	value: T;
}

interface IsMethods {
	readonly during: (callback: () => void) => void;
}

/// Callstack based contextual values that doesn't use Vide *ff*cts
export class Contextual<T> {
	private readonly values: Map<thread, SingleValue<T>>;

	constructor(private readonly defaultValue: T) {
		this.values = new Map();
	}

	is(contextualValue: T): IsMethods {
		const value = { value: contextualValue };

		return table.freeze({
			during: (callback) => {
				const currentThread = coroutine.running();
				const previousValue = this.values.get(currentThread);

				this.values.set(currentThread, value);
				callback();

				if (previousValue) this.values.set(currentThread, previousValue);
				else this.values.delete(currentThread);
			},
		});
	}

	now(): T {
		const currentThread = coroutine.running();
		return this.values.has(currentThread) ? this.values.get(currentThread)!.value : this.defaultValue;
	}
}
