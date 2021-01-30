import { vec2 } from 'gl-matrix';

export type InputState =
{
	mousePos: vec2,
	mouseDown: boolean,
};

const inputState: InputState =
{
	mousePos: vec2.create(),
	mouseDown: false,
};

export const initInputs = ( canvas: HTMLCanvasElement ): void =>
{
	canvas.onmousemove = e =>
	{
		var rect = (e.target as any).getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		inputState.mousePos[0] = x;
		inputState.mousePos[1] = y;
	};

	canvas.onmousedown = e =>
		inputState.mouseDown = true;

	canvas.onmouseup = e =>
		inputState.mouseDown = false;
}

export const sampleInputs = (): InputState => inputState;
