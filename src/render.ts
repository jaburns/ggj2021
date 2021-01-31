import { IMAGES } from "./images";
import { GameState } from "./state";
import { vec2 } from 'gl-matrix';
import { Diver } from "./diver";
import { GameObject } from "./gameobject";

let ctx: CanvasRenderingContext2D;

let rotationframe: number = 0;

let objects: any[] = []; // holds game objects to be rendered

let diver = new Diver();
let boat = new GameObject();

export const initRenderer = ( canvas: HTMLCanvasElement ): void =>
{
    ctx = canvas.getContext('2d')!;

    diver.sprite = IMAGES['DiverSprite1.png'];
    diver.scale = 0.20;

    boat.sprite = IMAGES['Boat.png'];
    boat.scale = 0.25;

    objects.push(diver);
    objects.push(boat);
};

export const render = ( state0: GameState, state1: GameState, lerpTime: number ): void =>
{
    rotationframe += 0.01;
    ctx.clearRect( 0, 0, 1280, 720 );

    const lerpPlayerPos = vec2.lerp( vec2.create(), state0.playerPos, state1.playerPos, lerpTime );

    diver.rotation =  rotationframe;
    diver.position = lerpPlayerPos


    // render the objects
    objects.map((o) => {
        o.render(ctx);
    });

};