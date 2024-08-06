import {
	Cell,
	Result,
} from 'src/components/organisms/TicTacToe/TicTacToe.machine';

export const checkForWinner = (board: Cell[][]): Result => {
	// Helper function to check if all elements in the array are the same and not null
	const allEqual = (arr: Cell[]): 'wonX' | 'wonO' | null => {
		const uniqueCells = new Set(arr);
		if (uniqueCells.size === 1 && !uniqueCells.has(null)) {
			return uniqueCells.has('x') ? 'wonX' : 'wonO';
		}
		return null;
	};

	// Determine the size of the board
	const size = board.length;

	// Check rows
	for (let row = 0; row < size; row++) {
		const result = allEqual(board[row]);
		if (result) {
			return result;
		}
	}

	// Check columns
	for (let col = 0; col < size; col++) {
		const column: Cell[] = board.map((row) => row[col]);
		const result = allEqual(column);
		if (result) {
			return result;
		}
	}

	// Check main diagonal (top-left to bottom-right)
	const mainDiagonal: Cell[] = [];
	for (let i = 0; i < size; i++) {
		mainDiagonal.push(board[i][i]);
	}
	const mainDiagonalResult = allEqual(mainDiagonal);
	if (mainDiagonalResult) {
		return mainDiagonalResult;
	}

	// Check anti-diagonal (top-right to bottom-left)
	const antiDiagonal: Cell[] = [];
	for (let i = 0; i < size; i++) {
		antiDiagonal.push(board[i][size - 1 - i]);
	}
	const antiDiagonalResult = allEqual(antiDiagonal);
	if (antiDiagonalResult) {
		return antiDiagonalResult;
	}

	// Check for draw
	const isBoardFull = board.every((row) =>
		row.every((cell) => cell !== null),
	);
	if (isBoardFull) {
		return 'draw';
	}

	// If no winner and board is not full
	return 'inProgress';
};

export const TicTacToeHelpers = {
	checkForWinner,
};
