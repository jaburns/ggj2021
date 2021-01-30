import { vec2 } from 'gl-matrix';
import { InputState } from './inputs';

export type GameState =
{
	playerPos: vec2,
};

export const GameState =
{
	createNew(): GameState
	{
		return {
			playerPos: vec2.create(),
		};
	},

	step( self: GameState, inputs: InputState ): void
	{
		self.playerPos[0] = inputs.mousePos[0] + 10 * Math.random();
		self.playerPos[1] = inputs.mousePos[1] + 10 * Math.random();
	}
};