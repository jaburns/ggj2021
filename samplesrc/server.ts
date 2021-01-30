import { NetSyncServer, WebSocketServer, Const, ServerSessionHandler, ServerSessionContext, TickInput } from '../libsrc';
import { PlayerState, ServerState, ServerStateClientView, ServerStateClientViewDiff, TICK_MILLIS } from './game';
import { Server as WSServer } from 'ws';
import { cloneDeep } from 'lodash';
import { createServer } from 'http';
import { Server as StaticServer } from 'node-static';
import * as microtime from 'microtime';

const fileServer = new StaticServer( './public' );
const httpServer = createServer( fileServer.serve.bind( fileServer ));
const HTTP_PORT = 8080;
httpServer.listen( HTTP_PORT );
console.log( 'Listening on ' + HTTP_PORT + '...' );

class SampleServerSessionHandler implements ServerSessionHandler<ServerState, ServerStateClientView, ServerStateClientViewDiff>
{
	constructor()
	{
		void 0;
	}

	onTick(
		_context: ServerSessionContext<ServerState>,
		previousState: Const<ServerState>,
		currentState: Const<ServerState>,
		inputs: Const<Record<number, TickInput>>
	): ServerState
	{
		const newState = cloneDeep( currentState ) as ServerState;

		for( const k in inputs )
		{
			if( !( k in newState.players ))
				newState.players[k] = PlayerState.createEmpty();

			if( k in previousState.players )
				PlayerState.tick( newState.players[k], inputs[k] );
		}

		return newState;
	}

	createClientStateView( _playerId: number, fullState: Const<ServerState> ): ServerStateClientView
	{
		return { fullState };
	}

	encodeStateViewDiff( _previous: Const<ServerStateClientView>, current: Const<ServerStateClientView> ): ServerStateClientViewDiff
	{
		return { newState: current };
	}

	onSessionStop(): void
	{
		void 0;
	}
}

const socketServer = new WebSocketServer( new WSServer({ port: 8081 }));
const netsyncServer = new NetSyncServer<ServerState, ServerStateClientView, ServerStateClientViewDiff, SampleServerSessionHandler, true>(
	socketServer, ServerStateClientView.createEmpty(), async _ => 'room'
);
netsyncServer.createSession( 'room', new SampleServerSessionHandler(), ServerState.createEmpty(), 60000 );

let lastTickTime = microtime.now();
const mainLoop = () =>
{
	const now = microtime.now();

	if( now >= lastTickTime + TICK_MILLIS * 1000 )
	{
		lastTickTime = now;
		netsyncServer.tick();
	}

	setTimeout( mainLoop, 0 ); // Chill CPU, okay accuracy.
//	setImmediate( mainLoop );  // Pins CPU, best timing accuracy.
};

mainLoop();