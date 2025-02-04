export function createLayoutOrder() {
	let currentOrder = 0;
	return () => ++currentOrder;
}
