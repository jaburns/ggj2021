import { Sprites } from "./assets";
import { GameState } from "./state";
import { vec2 } from 'gl-matrix';

let ctx: CanvasRenderingContext2D;

export const initRenderer = ( canvas: HTMLCanvasElement ): void =>
{
	ctx = canvas.getContext('2d')!;
};

export const render = ( state0: GameState, state1: GameState, lerpTime: number ): void =>
{
	ctx.clearRect( 0, 0, 1280, 720 );

	const lerpPlayerPos = vec2.lerp( vec2.create(), state0.playerPos, state1.playerPos, lerpTime );
	ctx.drawImage( Sprites['sprite.png'], lerpPlayerPos[0], lerpPlayerPos[1] );
};