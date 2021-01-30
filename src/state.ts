import { vec2 } from 'gl-matrix';
import { InputState } from './inputs';
import { SOUNDS } from './sounds';

export type GameState =
{
    tick: number,
    playerPos: vec2,
};

export const GameState =
{
    createNew(): GameState
    {
        return {
            tick: 0,
            playerPos: vec2.create(),
        };
    },

    step( self: GameState, inputs: InputState ): void
    {
        self.tick++;

        if( self.tick === 1 )
            SOUNDS['music.mp3'].play();

        self.playerPos[0] = inputs.mousePos[0] + 10 * Math.random();
        self.playerPos[1] = inputs.mousePos[1] + 10 * Math.random();
    }
};