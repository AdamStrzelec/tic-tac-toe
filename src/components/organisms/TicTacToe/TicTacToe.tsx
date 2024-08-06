import React from 'react';
import styled from 'styled-components';
import { useTicTacToe } from './useTicTacToe';

export const TicTacToe = () => {
	const { board, handleClick, handleReset, handleNewGame } = useTicTacToe();
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div>
				{board.map((row, rowIndex) => (
					<div key={rowIndex} style={{ display: 'flex' }}>
						{row.map((cell, cellIndex) => (
							<BoardItem
								key={cellIndex}
								onClick={() => handleClick(rowIndex, cellIndex)}
							>
								{cell}
							</BoardItem>
						))}
					</div>
				))}
				<button onClick={() => handleReset(3)}>3 x 3</button>
				<button onClick={() => handleReset(4)}>4 x 4</button>
				<button onClick={() => handleReset(5)}>5 x 5</button>
				<button onClick={handleNewGame}>new game</button>
			</div>
		</div>
	);
};

const BoardItem = styled.div`
	width: 80px;
	height: 80px;
	background-color: orange;
	margin: 5px;
	cursor: pointer;
`;
