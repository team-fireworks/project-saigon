import { useCamera, useEventListener } from "@rbxts/pretty-vide-utils";
import { effect, source } from "@rbxts/vide";

const BASE_RESOLUTION = new Vector2(1280, 832);
const MIN_SCALE = 0.5;
const DOMINANT_AXIS = 0.5;

const scale = source(1);

function callable<T extends Callback, U>(callback: T, object: U): T & U {
	return setmetatable(object as never, {
		__call: (_, ...args) => callback(...args),
	});
}

export const px = callable((value: number) => math.round(value * scale()), {
	even: (value: number) => math.round(value * scale() * 0.5) * 2,
	scale: (value: number) => value * scale(),
	floor: (value: number) => math.floor(value * scale()),
	ceil: (value: number) => math.ceil(value * scale()),
});

export const udimPx = callable((value: number) => new UDim(0, math.round(value * scale())), {
	even: (value: number) => new UDim(math.round(value * scale() * 0.5) * 2),
	scale: (value: number) => new UDim(value * scale()),
	floor: (value: number) => new UDim(math.floor(value * scale())),
	ceil: (value: number) => new UDim(math.ceil(value * scale())),
});

export const udim2Px = callable(
	(x: number, y: number) => UDim2.fromOffset(math.round(x * scale()), math.round(y * scale())),
	{
		even: (x: number, y: number) =>
			UDim2.fromOffset(math.round(x * scale() * 0.5) * 2, math.round(y * scale() * 0.5) * 2),
		scale: (x: number, y: number) => UDim2.fromOffset(x * scale(), y * scale()),
		floor: (x: number, y: number) => UDim2.fromOffset(math.floor(x * scale()), math.floor(y * scale())),
		ceil: (x: number, y: number) => UDim2.fromOffset(math.ceil(x * scale()), math.ceil(y * scale())),
	},
);

export function usePx() {
	const camera = useCamera();

	const updateScale = () => {
		const width = math.log(camera().ViewportSize.X / BASE_RESOLUTION.X, 2);
		const height = math.log(camera().ViewportSize.Y / BASE_RESOLUTION.Y, 2);
		const centered = width + (height - width) * DOMINANT_AXIS;

		scale(math.max(2 ** centered, MIN_SCALE));
	};

	effect(() => {
		useEventListener(camera().GetPropertyChangedSignal("ViewportSize"), () => {
			updateScale();
		});
	});

	updateScale();
}
