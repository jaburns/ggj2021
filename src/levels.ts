import { vec2 } from 'gl-matrix';

export type LevelPoly =
{
    points: vec2[],
};

export const LevelPoly =
{
    create(): LevelPoly 
    {
        return {
            points: [],
        };
    }
};

export type LevelDef =
{
    polys: LevelPoly[],
};

export const LevelDef =
{
    create(): LevelDef 
    {
        return {
            polys: [],
        };
    },

    save( self: LevelDef ): string
    {
        return JSON.stringify( self );
    },

    load( level: string ): LevelDef
    {
        return JSON.parse( level ) as LevelDef;
    },
};