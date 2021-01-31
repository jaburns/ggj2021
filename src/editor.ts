import { vec2 } from "gl-matrix";
import { IMAGES } from "./images";
import { drawLevel, LevelDef, LevelPoly } from "./levels";

// level size 2400 2700

const CORAL_COUNT = 18;
const TREASURE_COUNT = 5;

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const camera = vec2.create();
let level = LevelDef.create();
let mousePos = vec2.create();
let cameraDrag = false;
let nodeDrag: vec2 | null = null;
let curPoly: LevelPoly | null = null;
let curCoral: number = 1;
let curTreasure: number = 1;
const keys = new Set<string>();

const getClosestPolyIndexToMousePos = (): number | null =>
{
	let minD2 = Infinity;
	let result: number | null = null;

	for( let j = 0; j < level.polys.length; ++j )
	{
		let poly = level.polys[j];
		for( let i = 0; i < poly.points.length; ++i )
		{
			const d2 = vec2.squaredDistance( poly.points[i], mousePos );
			if( d2 < minD2 )
			{
				result = j;
				minD2 = d2;
			}
		}
	}

	if( Math.sqrt( minD2 ) > 20 )
		result = null;

	return result;
};

const getClosestObjectIndexToMousePos = (): number | null =>
{
	let minD2 = Infinity;
	let result: number | null = null;

	for( let j = 0; j < level.objects.length; ++j )
	{
		const d2 = vec2.squaredDistance( level.objects[j].pos, mousePos );
		if( d2 < minD2 )
		{
			result = j;
			minD2 = d2;
		}
	}

	if( Math.sqrt( minD2 ) > 20 )
		result = null;

	return result;
};

const getClosestNodeToMousePos = (): vec2 | null =>
{
	let minD2 = Infinity;
	let result: vec2 | null = null;

	for( const poly of level.polys )
	{
		for( let i = 0; i < poly.points.length; ++i )
		{
			const d2 = vec2.squaredDistance( poly.points[i], mousePos );
			if( d2 < minD2 )
			{
				result = poly.points[i];
				minD2 = d2;
			}
		}
	}

	for( const obj of level.objects )
	{
		const d2 = vec2.squaredDistance( obj.pos, mousePos );
		if( d2 < minD2 )
		{
			result = obj.pos;
			minD2 = d2;
		}
	}

	if( Math.sqrt( minD2 ) > 20 )
		result = null;

	return result;
};

const getMousePos = ( e:MouseEvent ): vec2 =>
{
	var rect = (e.target as any).getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;
	return vec2.fromValues( x + camera[0], y + camera[1] );
};

canvas.onmousedown = e =>
{
	mousePos = getMousePos(e);

	if( keys.has('Digit1'))
	{
		level.objects.push({
			kind: 'coral',
			image: 'Coral' + curCoral + '.png',
			pos: vec2.clone( mousePos ),
		});
	}
	else if( keys.has('Digit2'))
	{
		level.objects.push({
			kind: 'treasure',
			image: 'Treasure' + curTreasure + '.png',
			pos: vec2.clone( mousePos ),
		});
	}
	else if( keys.has('ControlLeft'))
	{
		const idx = getClosestPolyIndexToMousePos();
		if( idx !== null )
		{
			level.polys.splice( idx, 1 );
			return;
		}
		const idx0 = getClosestObjectIndexToMousePos();
		if( idx0 !== null )
		{
			level.objects.splice( idx0, 1 );
			return;
		}
	}
	else if( curPoly !== null )
	{
		curPoly.points.push(getMousePos(e));
	}
	else
	{
		const grabNode = getClosestNodeToMousePos();
		if( grabNode === null )
			cameraDrag = true;
		else 
			nodeDrag = grabNode;
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
	else if( nodeDrag !== null )
	{
		vec2.copy( nodeDrag, mousePos );
	}
};

canvas.onmouseup = e =>
{
	cameraDrag = false;
	nodeDrag = null;
};

document.onkeydown = e =>
{
	if( keys.has(e.code))
		return;

	keys.add(e.code);

	if( e.code === 'ArrowLeft' )
	{
		curCoral -= 1;
		if( curCoral < 1) curCoral = 1;
	}
	else if( e.code === 'ArrowRight' )
	{
		curCoral += 1;
		if( curCoral > CORAL_COUNT) curCoral = CORAL_COUNT;
	}
	else if( e.code === 'ArrowUp' )
	{
		curTreasure -= 1;
		if( curTreasure < 1) curTreasure = 1;
	}
	else if( e.code === 'ArrowDown' )
	{
		curTreasure += 1;
		if( curTreasure > TREASURE_COUNT) curTreasure = TREASURE_COUNT;
	}
	else if( e.code === 'ShiftLeft' )
	{
		curPoly = LevelPoly.create();
	}
	else if( e.code === 'Space' )
	{
		navigator.clipboard.writeText(LevelDef.save(level));
	}
};

document.onkeyup = e =>
{
	keys.delete(e.code);

	if( e.code === 'ShiftLeft' && curPoly !== null )
	{
		if( curPoly.points.length > 2 )
			level.polys.push( curPoly );
		curPoly = null;
	}
};

const draw = () =>
{
	drawLevel( ctx, camera, level, true );

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
		ctx.stroke();
		ctx.restore();
	}

    for( const obj of level.objects )
    {
		ctx.save();
        ctx.translate(-camera[0], -camera[1]);
        ctx.drawImage(IMAGES[obj.image], obj.pos[0], obj.pos[1]);
		ctx.restore();
    }

	ctx.save();
	ctx.scale(0.25, 0.25);
	ctx.drawImage(IMAGES['Coral' + curCoral + '.png'], 0, 0);
	ctx.drawImage(IMAGES['Treasure' + curTreasure + '.png'], 1000, 0);
	ctx.restore();
};

const frame = () =>
{
	requestAnimationFrame( frame );

	draw();
};

export const main = () =>
{
	const eqIdx = window.location.href.indexOf('=');
	if( eqIdx >= 0 )
	{
		const map = window.location.href.substr( eqIdx + 1 );
		level = LevelDef.load( map );
	}

	frame();
};