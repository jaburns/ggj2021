import { IMAGES } from "./images";
import { drawLevel } from "./levels";
import { GameState, GameObject } from "./state";
import { Const } from './utils';
import { vec2 } from 'gl-matrix';

let ctx: CanvasRenderingContext2D;

export const initRenderer = ( canvas: HTMLCanvasElement ): void =>
{
    ctx = canvas.getContext('2d')!;
};

export const render = ( state: Const<GameState> ): void =>
{
    // Set the background to something ocean like
    ctx.clearRect( 0, 0, 1280, 720 );
    ctx.fillStyle = "Blue"
    ctx.fillRect(0, 0, 1280, 720);
    ctx.save();

    drawLevel( ctx, state.cameraPos, state.level, false, 0 );

    // render the game objects in specific order
    renderGameObject( state.diver.gameObject, state.cameraPos );
    renderGameObject( state.boat.gameObject, state.cameraPos );

    drawLevel( ctx, state.cameraPos, state.level, false, 1 );
    ctx.restore();
};

// Here we draw each game object to the canvas
const renderGameObject = ( go: Const<GameObject>, camera: Const<vec2>): void =>
{
    const sprite = IMAGES[go.spriteName];

    let cx = sprite.width / 2;
    let cy = sprite.height / 2;
    let cos = Math.cos(go.rotation), sin = Math.sin(go.rotation);

    let flip = 1;
    if(go.flip == true) {
        flip = -1;
    }

    // rotate, translate, scale, and flip across x axis
    ctx.setTransform(
        go.scale * cos * flip,
        go.scale * sin,
        go.scale * -sin * flip,
        go.scale * cos,
        go.position[0] - camera[0],
        go.position[1] - camera[1]
    );

    ctx.drawImage(sprite, -cx, -cy, sprite.width, sprite.height);
    // Important to restore the transform matrix before leaving.
    // Kind of like push and pop in opengl
    ctx.setTransform(1, 0, 0, 1, 0, 0);
};