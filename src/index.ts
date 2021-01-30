import { initRenderer, render } from "./render";
import { GameState } from "./state";
import { cloneDeep } from 'lodash';
import { initInputs, sampleInputs } from "./inputs";
import { loadAllImages } from "./assets";

const TICK_MILLIS = 1000 / 60;

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

initInputs( canvas );
initRenderer( canvas );

let prevState: GameState = GameState.createNew();
let curState: GameState = GameState.createNew();

const tick = () =>
{
    prevState = curState;
    curState = cloneDeep( curState );
    GameState.step( curState, sampleInputs() );
};

let prevTickMillis: number = performance.now();
let tickAccMillis: number = 0;

const frame = () =>
{
    requestAnimationFrame(frame);

    const nowMillis = performance.now();
    const deltaMillis = nowMillis - prevTickMillis;
    prevTickMillis = nowMillis;
    tickAccMillis += deltaMillis;

    if( tickAccMillis > 1000 ) 
        tickAccMillis = 1000;

    while( tickAccMillis > TICK_MILLIS )
    {
        tickAccMillis -= TICK_MILLIS;
        tick();
    }

    render( prevState, curState, tickAccMillis / TICK_MILLIS );
};

const main = async () =>
{
    await loadAllImages();
    frame();
};

main();