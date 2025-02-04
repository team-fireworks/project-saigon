import { InferVideProps } from "@rbxts/ui-labs";
import { ReturnControls } from "@rbxts/ui-labs/src/ControlTypings/Typing";
import Vide, { Node } from "@rbxts/vide";

export interface StoryProps<C extends ReturnControls> {
	controls?: C;
	center?: boolean;
	story: (props: InferVideProps<C>) => Node;
}

const FULL_UDIM2 = UDim2.fromScale(1, 1);

export function story<C extends ReturnControls>({ controls, center = true, story }: StoryProps<C>) {
	return {
		vide: Vide,
		controls: controls,
		story: center
			? (props: InferVideProps<C>) => {
					return (
						<frame Size={FULL_UDIM2} BackgroundTransparency={1} Name="Centerstage">
							<uilistlayout HorizontalAlignment="Center" VerticalAlignment="Center" />
							{story(props)}
						</frame>
					);
				}
			: story,
	};
}
