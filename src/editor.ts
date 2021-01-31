import { vec2 } from "gl-matrix";
import { IMAGES } from "./images";
import { LevelDef, LevelPoly } from "./levels";

// level size 2400 2700

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const camera = vec2.create();
const level = LevelDef.create();
let mousePos = vec2.create();
let cameraDrag = false;
let curPoly: LevelPoly | null = null;
const keys = new Set<string>();

const getMousePos = ( e:MouseEvent ): vec2 =>
{
	var rect = (e.target as any).getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;
	return vec2.fromValues( x + camera[0], y + camera[1] );
};

canvas.onmousedown = e =>
{
	if( curPoly !== null )
	{
		curPoly.points.push(getMousePos(e));
	}
	else
	{
		cameraDrag = true;
	}
};

canvas.onmousemove = e =>
{
	mousePos = getMousePos(e);

	if( cameraDrag )
	{
		camera[0] -= e.movementX;
		camera[1] -= e.movementY;

		if( camera[0] < -50 ) camera[0] = -50;
		if( camera[1] < -50 ) camera[1] = -50;
		if( camera[0] > 2400 - 1280 + 50 ) camera[0] = 2400 - 1280 + 50;
		if( camera[1] > 2700 - 720 + 50 ) camera[1] = 2700 - 720 + 50;
	}
};

canvas.onmouseup = e =>
{
	cameraDrag = false;
};

document.onkeydown = e =>
{
	keys.add(e.code);

	if( e.code === 'ShiftLeft' )
	{
		curPoly = LevelPoly.create();
	}
};

document.onkeyup = e =>
{
	keys.delete(e.code);

	if( e.code === 'ShiftLeft' && curPoly !== null )
	{
		level.polys.push( curPoly );
		curPoly = null;
	}
};

const draw = () =>
{
	ctx.clearRect( 0, 0, 1280, 720 );
	ctx.drawImage( IMAGES['bg__.png'], -camera[0], -camera[1] );

	ctx.fillStyle = ctx.createPattern(IMAGES['floor__.png'], 'repeat')!;
	for( const poly of level.polys )
	{
		if( poly.points.length < 3 ) continue;

		ctx.save();
		ctx.translate(-camera[0], -camera[1]);
		ctx.beginPath();
		ctx.moveTo( poly.points[poly.points.length-1][0], poly.points[poly.points.length-1][1]);
		for( let i = 0; i < poly.points.length; ++i )
			ctx.lineTo( poly.points[i][0], poly.points[i][1]);
		ctx.fill();
		ctx.restore();
	}

	if( curPoly !== null && curPoly.points.length > 1 )
	{
		ctx.save();
		ctx.translate(-camera[0], -camera[1]);
		ctx.beginPath();
		ctx.moveTo( curPoly.points[0][0], curPoly.points[0][1]);
		for( let i = 1; i < curPoly.points.length; ++i )
			ctx.lineTo( curPoly.points[i][0], curPoly.points[i][1]);
		ctx.lineTo(mousePos[0], mousePos[1]);
		ctx.lineTo( curPoly.points[0][0], curPoly.points[0][1]);
		ctx.fill();
		ctx.restore();
	}
};

const frame = () =>
{
	requestAnimationFrame( frame );

	draw();
};

export const main = () =>
{
	frame();
};