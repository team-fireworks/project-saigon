import { Modding } from "@flamework/core";

/** @metadata macro */
function todo<T>(abc?: Modding.Generic<T, "id">, xyz?: Modding.CallerMany<"line">) {
	assert(abc && xyz);

	print(abc, `${xyz.line}`);
}

export function test() {
	todo<"Hello">();
}
