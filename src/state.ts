import { vec2 } from 'gl-matrix';
import { InputState } from './inputs';
import { SOUNDS } from './sounds';
import { Const } from './utils';

export type GameObject =
{
    position: vec2,
    velocity: vec2,
    rotation: number,
    scale: number,
    spriteName: string,
    flip: boolean,
};

function lerp(a:number, b:number, percentage:number) {
    return (a*percentage)+(b*(1-percentage));
}

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
                scale: 0.15,
                flip: false,
                spriteName: 'DiverSprite1.png',
            }
        };
    },

    step(self: DiverState, inputs: Const<InputState>)
    {
        if(self.gameObject.position[0] < inputs.mousePos[0] - 4) {
            self.gameObject.velocity[0] = 2;
            self.gameObject.flip = false;
        }
        else if (self.gameObject.position[0] > inputs.mousePos[0] + 4) {
            self.gameObject.velocity[0] = -2;
            self.gameObject.flip = true;
        }
        else {
            self.gameObject.velocity[0] = 0;
        }

        if(inputs.mouseDown == false) {
            if(self.gameObject.velocity[1] > -1)
                self.gameObject.velocity[1] -= 0.1;
        }
        else {
            if(self.gameObject.velocity[1] < 1)
                self.gameObject.velocity[1] += 0.1;
        }

        self.gameObject.position[0] += self.gameObject.velocity[0];
        self.gameObject.position[1] += self.gameObject.velocity[1];

        if(self.gameObject.position[1] < 100)
        {
            self.gameObject.position[1] = 100;
            self.gameObject.velocity[1] = 0
        }

        let targetRot = Math.atan2(self.gameObject.velocity[1], Math.abs(self.gameObject.velocity[0]));
        // maybe do something here to make rotation smoother

        self.gameObject.rotation = lerp(targetRot, self.gameObject.rotation, 0.05);
        if(self.gameObject.rotation < -0.8)
            self.gameObject.rotation = -0.8;

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


    step( self: GameState, inputs: Const<InputState> ): void
    {
        self.tick++;

        if( self.tick === 1 )
            SOUNDS['music.mp3'].play();

        DiverState.step( self.diver, inputs );
    }
};