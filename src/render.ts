import { IMAGES } from "./images";
import { GameState, GameObject } from "./state";
import { Const } from './utils';

let ctx: CanvasRenderingContext2D;

export const initRenderer = ( canvas: HTMLCanvasElement ): void =>
{
    ctx = canvas.getContext('2d')!;
};

export const render = ( state: Const<GameState> ): void =>
{
    ctx.clearRect( 0, 0, 1280, 720 );

    renderGameObject( state.diver.gameObject );
};

const renderGameObject = ( go: Const<GameObject> ): void =>
{
    const sprite = IMAGES[go.spriteName];

    let cx = sprite.width / 2;
    let cy = sprite.height / 2;
    let cos = Math.cos(go.rotation), sin = Math.sin(go.rotation);

    ctx.setTransform(
        go.scale * cos,
        go.scale * sin,
        go.scale * -sin,
        go.scale * cos,
        go.position[0],
        go.position[1]
    );

    ctx.drawImage(sprite, -cx, -cy, sprite.width, sprite.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
};