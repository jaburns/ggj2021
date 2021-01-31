import { IMAGES } from "./images";
import { GameState } from "./state";
import { vec2 } from 'gl-matrix';

let ctx: CanvasRenderingContext2D;

let frame: number = 0;

function drawSprite(sprite: HTMLImageElement, x: number , y:number, scale: number = 1, rotation: number = 0) {
    ctx.save();

    ctx.scale(scale, scale);
    ctx.rotate(rotation);
    ctx.translate(x, y);
    ctx.drawImage( sprite, 0, 0);
    ctx.restore();
}

export const initRenderer = ( canvas: HTMLCanvasElement ): void =>
{
    ctx = canvas.getContext('2d')!;
};

export const render = ( state0: GameState, state1: GameState, lerpTime: number ): void =>
{
    let boat = IMAGES['Boat.png']
    let sprite = IMAGES['sprite.png']
    let diver = IMAGES['DiverSprite1.png'] // figure out sprite animation later

    ctx.clearRect( 0, 0, 1280, 720 );

    const lerpPlayerPos = vec2.lerp( vec2.create(), state0.playerPos, state1.playerPos, lerpTime );

    drawSprite(sprite, lerpPlayerPos[0], lerpPlayerPos[1], 1);
    drawSprite(boat, 640, 0, 0.25, frame);
    drawSprite(diver, 120, 0, 0.25, frame);
    frame += 0.01;
};