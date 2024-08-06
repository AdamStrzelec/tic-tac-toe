import { useMachine } from '@xstate/react';
import { ticTacToeMachine, BoardSize } from './TicTacToe.machine';

export const useTicTacToe = () => {
	const [state, send] = useMachine(ticTacToeMachine);

	const handleClick = (rowIndex: number, cellIndex: number) => {
		if (state.context.board[rowIndex][cellIndex]) return;

		send({ type: 'CLICK_CELL', value: { cellIndex, rowIndex } });
		send({ type: 'CHECK_RESULT', value: state.context.board });
	};

	const handleReset = (value: BoardSize) => {
		send({ type: 'RESET', value });
	};

	const handleNewGame = () => {
		send({ type: 'NEW_GAME' });
	};

	return {
		board: state.context.board,
		handleClick,
		handleReset,
		handleNewGame,
	};
};
