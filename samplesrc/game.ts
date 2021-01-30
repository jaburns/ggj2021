import { Const, TickInput } from '../libsrc';

export const enum Buttons
{
	Accelerate = 0,
}

export const TICK_MILLIS = 100;
export const TURN_RATE_RADS_PER_MS = 0.005;
const ACCELERATION = 0.1;

export type ServerState =
{
	readonly tick: number,
	players: Record<number, PlayerState>,
};

export const ServerState =
{
	createEmpty(): ServerState
	{
		return {
			tick: 0,
			players: {}
		};
	},
};

export type PlayerState =
{
	x: number,
	y: number,
	vx: number,
	vy: number,
	radians: number,
};

export const PlayerState =
{
	createEmpty(): PlayerState
	{
		return {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			radians: 0,
		};
	},

	tick( self: PlayerState, input: Const<TickInput> ): void
	{
		self.radians += input.reduce(( acc, x ) => acc + x.input.analogDeltas[0], 0 );

		if( input.reduce(( acc, x ) => acc || x.input.buttonsHeld.has( Buttons.Accelerate ), false ))
		{
			self.vx += ACCELERATION * Math.cos( self.radians );
			self.vy += ACCELERATION * Math.sin( self.radians );
		}

		self.x += self.vx;
		self.y += self.vy;
	}
};

export type ClientState =
{
	readonly tick: number,
	localPlayer: PlayerState,
};

export const ClientState =
{
	createEmpty(): ClientState
	{
		return {
			tick: 0,
			localPlayer: PlayerState.createEmpty(),
		};
	}
};

export type ClientFrameState =
{
	radiansSinceTick: number,
};

export const ClientFrameState =
{
	createEmpty(): ClientFrameState
	{
		return {
			radiansSinceTick: 0,
		};
	}
};

export type ServerStateClientView =
{
	fullState: ServerState,
};

export type ServerStateClientViewDiff =
{
	newState: ServerStateClientView,
};

export const ServerStateClientView =
{
	createEmpty(): ServerStateClientView
	{
		return { fullState: ServerState.createEmpty() };
	}
};