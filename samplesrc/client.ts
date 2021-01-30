import { Const, ClientSessionHandler, createWebSocketClient, NetSyncClient, InputSample, FrameInput, TickInput, createEmptyInputSample } from '../libsrc';
import { ServerStateClientView, ServerStateClientViewDiff, ClientState, TURN_RATE_RADS_PER_MS, ClientFrameState, PlayerState, Buttons } from './game';
import cloneDeep = require( 'lodash/cloneDeep' );
import { render } from './render';

const keysDown: Set<string> = new Set();
document.onkeydown = e => keysDown.add( e.code );
document.onkeyup = e => keysDown.delete( e.code );

class SampleClientSessionHandler implements ClientSessionHandler<ClientState, ServerStateClientView, ServerStateClientViewDiff>
{
	private readonly clientFrameState: ClientFrameState;

	constructor()
	{
		this.clientFrameState = ClientFrameState.createEmpty();
	}

	onFrameNotReady( serverStateView: Const<ServerStateClientView> ): boolean
	{
		return true;
	}

	onFrame(
		clientState0: Const<ClientState>,
		clientState1: Const<ClientState>,
		serverView0: Const<ServerStateClientView>,
		serverView1: Const<ServerStateClientView>,
		input: Const<FrameInput>,
	): void
	{
		this.clientFrameState.radiansSinceTick += input.input.analogDeltas[0];

		render( clientState0, clientState1, this.clientFrameState, serverView0, serverView1, input.subtickTime );
	}

	onTick( clientState: Const<ClientState>, serverView: Const<ServerStateClientView>, input: Const<TickInput> ): ClientState | null
	{
		const newClientState = cloneDeep( clientState ) as ClientState;

		PlayerState.tick( newClientState.localPlayer, input );

		this.clientFrameState.radiansSinceTick = 0;

		return newClientState;
	}

	sampleInputs( deltaMillis: number ): InputSample
	{
		const sample = createEmptyInputSample( 1, 0 );

		if( keysDown.has( 'ArrowLeft' ))
			sample.analogDeltas[0] -= deltaMillis * TURN_RATE_RADS_PER_MS;

		if( keysDown.has( 'ArrowRight' ))
			sample.analogDeltas[0] += deltaMillis * TURN_RATE_RADS_PER_MS;

		if( keysDown.has( 'ArrowUp' ))
			sample.buttonsHeld.add(Buttons.Accelerate);

		return sample;
	}
}

const main = async () =>
{
	const socketClient = await createWebSocketClient( 'ws://localhost:8081' );
	const netsyncClient = new NetSyncClient<ClientState, ServerStateClientView, ServerStateClientViewDiff, true>( socketClient );
	const session = await netsyncClient.join( 33, ClientState.createEmpty(), ServerStateClientView.createEmpty(), new SampleClientSessionHandler(), true );

	if( session === null )
		return;

	const frame = () =>
	{
		window.requestAnimationFrame( frame );
		session.frame( performance.now());
	};

	frame();
};

main();