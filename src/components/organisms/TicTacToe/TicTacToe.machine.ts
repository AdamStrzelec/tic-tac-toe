import { createMachine, assign } from 'xstate';

type Player = 'o' | 'x';

export type Cell = Player | null;

export type Result = 'wonO' | 'wonX' | 'draw' | 'inProgress';

export type BoardSize = 3 | 4 | 5;

const context = {
	board: Array.from({ length: 3 }, () => Array(3).fill(null)) as Cell[][],
	boardSize: 3 as BoardSize,
	playerTurn: 'x' as Player,
	result: 'inProgress' as Result,
};

export const ticTacToeMachine = createMachine(
	{
		initial: 'playing',
		types: {} as {
			context: typeof context;
			events:
				| {
						type: 'CLICK_CELL';
						value: { rowIndex: number; cellIndex: number };
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }
				| {
						type: 'NEW_GAME';
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }
				| {
						type: 'CHECK_RESULT';
						value: Cell[][];
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }
				| {
						type: 'RESET';
						value: BoardSize;
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  };
		},
		context,
		states: {
			playing: {
				on: {
					CLICK_CELL: [
						{
							target: 'playing',
							actions: 'clickCell',
						},
					],
					NEW_GAME: [
						{
							target: 'playing',
							actions: 'newGame',
						},
					],
					CHECK_RESULT: [
						{
							target: 'playing',
							actions: 'checkResult',
						},
					],
					RESET: [
						{
							target: 'playing',
							actions: 'resetBoard',
						},
					],
				},
			},
		},
	},
	{
		actions: {
			clickCell: assign({
				board: ({ context, event }) => {
					if (event.type === 'CLICK_CELL') {
						const { rowIndex, cellIndex } = event.value;
						return context.board.map((row, rIndex) =>
							row.map((cell, cIndex) =>
								rIndex === rowIndex && cIndex === cellIndex
									? context.playerTurn
									: cell,
							),
						);
					}
					return context.board;
				},
				playerTurn: ({ context }) =>
					context.playerTurn === 'x' ? 'o' : 'x',
			}),
			resetBoard: assign({
				board: ({ context, event }) => {
					if (
						event.type === 'RESET' &&
						context.boardSize !== event.value
					) {
						return Array.from({ length: event.value }, () =>
							Array(event.value).fill(null),
						);
					}
					return context.board;
				},
				playerTurn: () => 'x' as Player,
				boardSize: ({ context, event }) => {
					if (
						event.type === 'RESET' &&
						event.value !== context.boardSize
					) {
						return event.value;
					}
					return context.boardSize;
				},
				result: () => 'inProgress' as Result,
			}),
			checkResult: assign({
				result: ({ context, event }) => {
					if (event.type === 'CHECK_RESULT') {
						console.log('check result');
					}
					return context.result;
				},
			}),
			newGame: assign({
				board: ({ context, event }) => {
					if (event.type === 'NEW_GAME') {
						return Array.from({ length: context.boardSize }, () =>
							Array(context.boardSize).fill(null),
						);
					}
					return context.board;
				},
				playerTurn: () => 'x' as Player,
				result: () => 'inProgress' as Result,
			}),
		},
	},
);
