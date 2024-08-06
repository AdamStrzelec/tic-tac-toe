import React from 'react';
import { Button } from 'src/components/atoms/Button/Button';
import { BoardItem } from 'src/components/molecules/BoardItem/BoardItem';
import styled, { css, keyframes } from 'styled-components';
import { useTicTacToe } from './hooks/useTicTacToe';

export const TicTacToe = () => {
	const {
		board,
		handleClick,
		handleReset,
		handleNewGame,
		handleSetGameType,
		gameType,
		result,
		points,
	} = useTicTacToe();

	return (
		<Wrapper>
			<ButtonsWrapper>
				<Button
					text={'Single player'}
					disabled={gameType === 'singlePlayer'}
					onClick={() => handleSetGameType('singlePlayer')}
				/>
				<Button
					text={'Multi player'}
					disabled={gameType === 'multiPlayer'}
					onClick={() => handleSetGameType('multiPlayer')}
				/>
			</ButtonsWrapper>
			<ButtonsWrapper>
				<Button
					text={'3 x 3'}
					disabled={result !== 'inProgress'}
					onClick={() => handleReset(3)}
				/>
				<Button
					text={'4 x 4'}
					disabled={result !== 'inProgress'}
					onClick={() => handleReset(4)}
				/>
				<Button
					text={'5 x 5'}
					disabled={result !== 'inProgress'}
					onClick={() => handleReset(5)}
				/>
			</ButtonsWrapper>
			<BoardWrapper>
				{board.map((row, rowIndex) => (
					<ItemsWrapper key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<BoardItemWrapper
								key={cellIndex}
								topSeparator={rowIndex !== 0}
								leftSeparator={cellIndex !== 0}
							>
								<BoardItem
									key={cellIndex}
									onClick={() =>
										handleClick(rowIndex, cellIndex)
									}
									currentPlayer={cell}
								/>
							</BoardItemWrapper>
						))}
					</ItemsWrapper>
				))}
				{result !== 'inProgress' && (
					<div>
						<InfoBackground />
						<InfoContent>
							<WinnerInfo>
								{result === 'wonO' && 'Player O won'}
								{result === 'wonX' && 'Player X won'}
								{result === 'draw' && 'Draw'}!!!
							</WinnerInfo>
							<Button text={'New Game'} onClick={handleNewGame} />
						</InfoContent>
					</div>
				)}
			</BoardWrapper>
			<PlayerInfo>player X: {points.playerX}</PlayerInfo>
			<PlayerInfo>player O: {points.playerO}</PlayerInfo>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 30px;
	position: relative;
`;

const BoardWrapper = styled.div`
	position: relative;
`;

const ButtonsWrapper = styled.div`
	display: flex;
	gap: 15px;
`;

const ItemsWrapper = styled.div`
	display: flex;
`;

const BoardItemWrapper = styled.div<{
	topSeparator?: boolean;
	leftSeparator?: boolean;
}>(
	({ topSeparator, leftSeparator, theme: { colors } }) => css`
		${topSeparator &&
		css`
			border-top: 2px solid ${colors.separator};
		`}
		${leftSeparator &&
		css`
			border-left: 2px solid ${colors.separator};
		`}
	`,
);

const backgroundAnimation = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }
`;

const InfoBackground = styled.div(
	({ theme: { colors } }) => css`
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0.7;
		top: 0;
		left: 0;
		background-color: ${colors.infoBackground};
		animation-name: ${backgroundAnimation};
		animation-duration: 0.5s;
		animation-iteration-count: 1;
	`,
);

const contentAnimation = keyframes`
 0% { transform: scale(0) }
 100% { transform: scale(1) }
`;

const InfoContent = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	animation-name: ${contentAnimation};
	animation-duration: 0.5s;
	animation-iteration-count: 1;
	gap: 30px;
`;

const WinnerInfo = styled.h2(
	({ theme: { colors } }) => css`
		color: ${colors.white};
	`,
);

const PlayerInfo = styled.h2(
	({ theme: { colors } }) => css`
		color: ${colors.buttonText};
	`,
);
