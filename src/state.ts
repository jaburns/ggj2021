import { vec2 } from 'gl-matrix';
import { InputState } from './inputs';
import { LevelDef, LEVEL_STRINGS } from './levels';
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
    kickAnim: number,
    oxygen: number,
    // extra diver-only state
};

export type BoatState =
{
    gameObject: GameObject,
};


export type GameState =
{
    tick: number,
    cameraPos: vec2,
    level: LevelDef,
    boat: BoatState,
    diver: DiverState
};

export const DiverState =
{
    create(): DiverState
    {
        return {
            kickAnim: 0,
            oxygen: 100.0,
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

    step(self: DiverState, inputs: Const<InputState>, camera: Const<vec2>, level: Const<LevelDef>)
    {
        self.gameObject.spriteName = 'DiverSprite'+((((self.kickAnim/10)|0)%2)+1)+'.png';

        if(self.gameObject.position[0] < (inputs.mousePos[0] + camera[0]) - 16) {
            self.gameObject.velocity[0] = 3;
            self.gameObject.flip = false;
        }
        else if (self.gameObject.position[0] > (inputs.mousePos[0] + camera[0]) + 16) {
            self.gameObject.velocity[0] = -3;
            self.gameObject.flip = true;
        }
        else {
            self.gameObject.velocity[0] = 0;
        }

        if(inputs.mouseDown == false) {
            if(self.gameObject.velocity[1] > -3)
                self.gameObject.velocity[1] -= 0.1;
        }
        else {
            self.kickAnim++;
            if(self.gameObject.velocity[1] < 3)
                self.gameObject.velocity[1] += 0.1;
        }

        self.gameObject.position[0] += self.gameObject.velocity[0];
        self.gameObject.position[1] += self.gameObject.velocity[1];

        const collision = LevelDef.collide( level, self.gameObject.position, 50 );
        vec2.copy( self.gameObject.position, collision.restoredPos );

        if(self.gameObject.position[1] < 650)
        {
            self.gameObject.position[1] = 650;
            self.gameObject.velocity[1] = 0
        }

        let targetRot = Math.atan2(self.gameObject.velocity[1], Math.abs(self.gameObject.velocity[0]));
        // maybe do something here to make rotation smoother

        self.gameObject.rotation = lerp(targetRot, self.gameObject.rotation, 0.05);
        if(self.gameObject.rotation < -0.8)
            self.gameObject.rotation = -0.8;

    }
};

export const BoatState = {

    create(): BoatState
    {
        return {
            gameObject: {
                position: vec2.create(),
                velocity: vec2.create(),
                rotation: 0,
                scale: 0.2,
                flip: false,
                spriteName: 'Boat.png',
            }
        };
    },
    step(self: BoatState, inputs: Const<InputState>)
    {
        self.gameObject.position[0] = 300;
        self.gameObject.position[1] = 575;
        self.gameObject.rotation = Math.sin(performance.now() / 1000.0) / 10.0;
    }
};




export const GameState =
{
    createNew(): GameState
    {
        return {
            tick: 0,
            cameraPos: vec2.create(),
            level: LevelDef.load( LEVEL_STRINGS[0] ),
            diver: DiverState.create(),
            boat: BoatState.create()
        };
    },

    step( self: GameState, inputs: Const<InputState> ): void
    {
        self.tick++;

        if( self.tick === 1 )
            SOUNDS['music.mp3'].play();

        if(self.diver.gameObject.position[0] - self.cameraPos[0] > (1280 - 340))
            self.cameraPos[0] += 2;
        if(self.diver.gameObject.position[0] - self.cameraPos[0] < 340)
            self.cameraPos[0] -= 2;

        if(self.diver.gameObject.position[1] - self.cameraPos[1] > (780 - 400))
            self.cameraPos[1] += 1.5;
        if(self.diver.gameObject.position[1] - self.cameraPos[1] < 200)
            self.cameraPos[1] -= 3;

        if(self.cameraPos[0] < 0)
            self.cameraPos[0] = 0;
        if(self.cameraPos[0] > 1110)
            self.cameraPos[0] = 1110;


        DiverState.step( self.diver, inputs, self.cameraPos, self.level );
        BoatState.step( self.boat, inputs );
    }
};