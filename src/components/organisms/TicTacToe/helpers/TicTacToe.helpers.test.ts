import { Cell } from 'src/components/organisms/TicTacToe/machine/TicTacToe.machine';
import { TicTacToeHelpers } from './ticTacToe.helpers';

const board3x3x: Cell[][] = [
	['o', 'o', 'x'],
	[null, 'x', 'o'],
	['x', null, 'x'],
];

const board3x3o: Cell[][] = [
	['o', 'o', 'o'],
	[null, 'x', 'o'],
	['o', null, 'x'],
];

const board3x3draw: Cell[][] = [
	['o', 'o', 'x'],
	['x', 'x', 'o'],
	['o', 'o', 'x'],
];

const board5x5: Cell[][] = [
	['x', 'o', 'x', 'o', 'o'],
	[null, 'x', 'o', 'x', 'o'],
	['o', null, 'x', 'o', 'x'],
	['o', 'x', 'o', 'x', 'o'],
	['x', 'o', 'x', 'o', 'o'],
];

test('checkForWinner', () => {
	expect(TicTacToeHelpers.checkForWinner(board3x3o)).toBe('wonO');
	expect(TicTacToeHelpers.checkForWinner(board3x3x)).toBe('wonX');
	expect(TicTacToeHelpers.checkForWinner(board3x3draw)).toBe('draw');
	expect(TicTacToeHelpers.checkForWinner(board5x5)).toBe('inProgress');
});
