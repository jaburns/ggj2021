import { vec2 } from 'gl-matrix';
import { InputState } from './inputs';
import { SOUNDS } from './sounds';

export type GameObject =
{
    position: vec2,
    velocity: vec2,
    rotation: number,
    scale: number,
    spriteName: string,
};

export type DiverState = 
{
    gameObject: GameObject,
    // extra diver-only state
};

export const DiverState =
{
    create(): DiverState
    {
        return {
            gameObject: {
                position: vec2.create(),
                velocity: vec2.create(),
                rotation: 0,
                scale: 0.25,
                spriteName: 'DiverSprite1.png',
            }
        };
    },

    step(self: DiverState, inputs: InputState)
    {
        self.gameObject.position[0] = inputs.mousePos[0];
        self.gameObject.position[1] = inputs.mousePos[1];

        self.gameObject.rotation += 0.1;
    }
};

export type GameState =
{
    tick: number,
    diver: DiverState,
};

export const GameState =
{
    createNew(): GameState
    {
        return {
            tick: 0,
            diver: DiverState.create(),
        };
    },

    step( self: GameState, inputs: InputState ): void
    {
        self.tick++;

        if( self.tick === 1 )
            SOUNDS['music.mp3'].play();

        DiverState.step( self.diver, inputs );
    }
};