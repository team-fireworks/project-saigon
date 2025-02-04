import { Derivable } from "@rbxts/vide";

export interface BaseProps {
	visible?: Derivable<boolean>;
	layoutOrder?: Derivable<number>;
	zIndex?: Derivable<number>;
}

export interface LayoutProps {
	anchorPoint?: Derivable<Vector2>;
	position?: Derivable<UDim2>;
	size?: Derivable<UDim2>;
	automaticSize?: Derivable<Enum.AutomaticSize>;
}
