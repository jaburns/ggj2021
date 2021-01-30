import { Const } from '../libsrc';
import { ClientFrameState, ClientState, PlayerState, ServerStateClientView } from './game';

const canvas = document.getElementById( 'game-canvas' ) as HTMLCanvasElement;
const ctx = canvas.getContext( '2d' )!;

export const render = (
	client0: Const<ClientState>,
	client1: Const<ClientState>,
	frameState: Const<ClientFrameState>,
	server0: Const<ServerStateClientView>,
	server1: Const<ServerStateClientView>,
	subtickTime: number,
): void =>
{
	ctx.clearRect( 0, 0, 600, 600 );

	drawPlayer( client0.localPlayer, client1.localPlayer, frameState, subtickTime );

	for( const k in server1.fullState.players )
	{
		if( !( k in server0.fullState.players ))
			continue;

		drawPlayer( server0.fullState.players[k], server1.fullState.players[k], null, subtickTime );
	}
};

const drawPlayer = ( p0: Const<PlayerState>, p1: Const<PlayerState>, frameState: ClientFrameState | null, subtickTime: number ) =>
{
	const x = 300 + p0.x + subtickTime * ( p1.x - p0.x );
	const y = 300 + p0.y + subtickTime * ( p1.y - p0.y );

	const rads = frameState !== null
		? p1.radians + frameState.radiansSinceTick
		: p0.radians + subtickTime * ( p1.radians - p0.radians );

	const dx = Math.cos( rads );
	const dy = Math.sin( rads );

	ctx.beginPath();
	ctx.strokeStyle = '#fff';
	ctx.lineWidth = 1;
	ctx.arc( x, y, 10, 0, 2 * Math.PI );
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo( x, y );
	ctx.lineTo( x + 600 * dx, y + 600 * dy );
	ctx.stroke();
};