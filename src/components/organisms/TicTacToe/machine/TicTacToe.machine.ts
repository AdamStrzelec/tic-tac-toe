import { createMachine, assign } from 'xstate';
import { TicTacToeHelpers } from '../helpers/ticTacToe.helpers';

export type Player = 'o' | 'x';

export type Cell = Player | null;

export type Result = 'wonO' | 'wonX' | 'draw' | 'inProgress';

export type BoardSize = 3 | 4 | 5;

export type GameType = 'singlePlayer' | 'multiPlayer';

const context = {
	board: Array.from({ length: 3 }, () => Array(3).fill(null)) as Cell[][],
	boardSize: 3 as BoardSize,
	playerTurn: 'x' as Player,
	result: 'inProgress' as Result,
	points: {
		playerX: 0,
		playerO: 0,
	},
	gameType: 'multiPlayer' as GameType,
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
						type: 'MAKE_RANDOM_MOVE';
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }
				| {
						type: 'SET_GAME_TYPE';
						value: GameType;
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
					MAKE_RANDOM_MOVE: [
						{
							target: 'playing',
							actions: 'makeRandomMove',
						},
					],
					SET_GAME_TYPE: [
						{
							target: 'playing',
							actions: 'setGameType',
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
				result: ({ context }) =>
					TicTacToeHelpers.checkForWinner(context.board),
				points: ({ context }) => {
					const result = TicTacToeHelpers.checkForWinner(
						context.board,
					);
					return {
						playerO:
							result === 'wonO'
								? (context.points.playerO += 1)
								: context.points.playerO,
						playerX:
							result === 'wonX'
								? (context.points.playerX += 1)
								: context.points.playerX,
					};
				},
			}),
			setGameType: assign({
				board: ({ context }) =>
					Array.from({ length: context.boardSize }, () =>
						Array(context.boardSize).fill(null),
					),
				playerTurn: () => 'x' as Player,
				result: () => 'inProgress' as Result,
				gameType: ({ context, event }) => {
					if (event.type === 'SET_GAME_TYPE') {
						return event.value;
					}
					return context.gameType;
				},
			}),
			makeRandomMove: assign({
				board: ({ context }) =>
					TicTacToeHelpers.findAndReplaceRandomNull(context.board),
				playerTurn: () => 'x' as Player,
			}),
			newGame: assign({
				board: ({ context }) =>
					Array.from({ length: context.boardSize }, () =>
						Array(context.boardSize).fill(null),
					),
				playerTurn: () => 'x' as Player,
				result: () => 'inProgress' as Result,
			}),
		},
	},
);
