import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import {
	ticTacToeMachine,
	BoardSize,
	GameType,
} from 'src/components/organisms/TicTacToe/machine/TicTacToe.machine';

export const useTicTacToe = () => {
	const [state, send] = useMachine(ticTacToeMachine);

	const handleClick = (rowIndex: number, cellIndex: number) => {
		if (state.context.board[rowIndex][cellIndex]) return;

		if (
			state.context.gameType === 'singlePlayer' &&
			state.context.playerTurn === 'o' &&
			state.context.result === 'inProgress'
		) {
			return;
		} else {
			send({ type: 'CLICK_CELL', value: { cellIndex, rowIndex } });
			send({ type: 'CHECK_RESULT', value: state.context.board });
		}
	};

	const handleReset = (value: BoardSize) => {
		send({ type: 'RESET', value });
	};

	const handleNewGame = () => {
		send({ type: 'NEW_GAME' });
	};

	const handleSetGameType = (value: GameType) => {
		send({ type: 'SET_GAME_TYPE', value });
	};

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		if (
			state.context.gameType === 'singlePlayer' &&
			state.context.playerTurn === 'o' &&
			state.context.result === 'inProgress'
		) {
			timeoutId = setTimeout(() => {
				send({ type: 'MAKE_RANDOM_MOVE' });
				send({ type: 'CHECK_RESULT', value: state.context.board });
			}, 600);
		}

		return () => clearTimeout(timeoutId);
	}, [state.context]);

	return {
		board: state.context.board,
		handleClick,
		handleReset,
		handleNewGame,
		result: state.context.result,
		points: state.context.points,
		gameType: state.context.gameType,
		handleSetGameType,
	};
};
