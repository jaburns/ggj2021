import { vec2 } from 'gl-matrix';
import { IMAGES } from './images';

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

export type LevelObject =
{
    kind: 'coral' | 'treasure',
    image: string,
    pos: vec2,
};

export type LevelDef =
{
    polys: LevelPoly[],
    objects: LevelObject[],
};

export const LevelDef =
{
    create(): LevelDef 
    {
        return {
            polys: [],
            objects: [],
        };
    },

    save( self: LevelDef ): string
    {
        return btoa( JSON.stringify( self ) );
    },

    load( level: string ): LevelDef
    {
        return JSON.parse( atob( level )) as LevelDef;
    },
};

export const drawLevel = ( ctx: CanvasRenderingContext2D, camera: vec2, level: LevelDef, outlines: boolean ): void =>
{
	ctx.clearRect( 0, 0, 1280, 720 );
	ctx.drawImage( IMAGES['bg__.png'], -camera[0], -camera[1] );

    if( outlines )
        ctx.strokeStyle = '#ff0';

	ctx.fillStyle = ctx.createPattern(IMAGES['floor__.png'], 'repeat')!;
	for( const poly of level.polys )
	{
		if( poly.points.length < 3 )
			poly.points.length = 0;

		ctx.save();
		ctx.translate(-camera[0], -camera[1]);
		ctx.beginPath();
		ctx.moveTo( poly.points[poly.points.length-1][0], poly.points[poly.points.length-1][1]);
		for( let i = 0; i < poly.points.length; ++i )
			ctx.lineTo( poly.points[i][0], poly.points[i][1]);
        ctx.fill();
        if( outlines )
            ctx.stroke();
		ctx.restore();
    }
    
    for( const obj of level.objects )
    {
        ctx.save();
        ctx.translate(-camera[0], -camera[1]);
        ctx.drawImage(IMAGES[obj.image], obj.pos[0], obj.pos[1]);
        if( outlines )
        {
            ctx.beginPath();
            ctx.arc( obj.pos[0], obj.pos[1], 10, 0, 2*Math.PI );
            ctx.stroke();
        }
		ctx.restore();
    }
};