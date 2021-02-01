import { initRenderer, render } from "./render";
import { GameState } from "./state";
import { initInputs, sampleInputs } from "./inputs";
import { initSounds } from './sounds';
import { loadAllImages } from "./images";
import { main as editorMain } from './editor';
import { LevelDef } from "./levels";

const TICK_MILLIS = 1000 / 60;

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

let curState: GameState;
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
        GameState.step( curState, sampleInputs() );
        render( curState );
    }
};

const main = async () =>
{
    if( window.location.href.indexOf('editor') >= 0 )
    {
        await loadAllImages();
        editorMain();
        return;
    }

    initSounds();
    initInputs( canvas );
    initRenderer( canvas );
    await loadAllImages();

    curState = GameState.createNew()

	const eqIdx = window.location.href.indexOf('=');
	if( eqIdx >= 0 )
	{
		const map = window.location.href.substr( eqIdx + 1 );
		curState.level = LevelDef.load( decodeURIComponent( map ));
	}

    frame();
};

main();
