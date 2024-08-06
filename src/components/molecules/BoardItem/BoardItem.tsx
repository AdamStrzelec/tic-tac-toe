import React from 'react';
import { Cell } from 'src/components/organisms/TicTacToe/machine/TicTacToe.machine';
import styled, { keyframes } from 'styled-components';
import oImage from 'src/assets/images/o.png';
import xImage from 'src/assets/images/x.png';

interface BoardItemProps {
	currentPlayer: Cell;
	onClick: () => void;
}

export const BoardItem = ({ currentPlayer, onClick }: BoardItemProps) => {
	return (
		<Item onClick={onClick}>
			{currentPlayer === 'x' && (
				<ImageWrapper>
					<ItemImg src={xImage} />
				</ImageWrapper>
			)}
			{currentPlayer === 'o' && (
				<ImageWrapper>
					<ItemImg src={oImage} />
				</ImageWrapper>
			)}
		</Item>
	);
};

const Item = styled.div`
	width: 100px;
	height: 100px;
	padding: 10px;
	cursor: pointer;
`;

const itemAnimation = keyframes`
 0% { transform: scale(0) }
 100% { transform: scale(1) }
`;

const ImageWrapper = styled.div`
	animation-name: ${itemAnimation};
	animation-duration: 0.5s;
	animation-iteration-count: 1;
`;

const ItemImg = styled.img`
	width: 100%;
	height: 100%;
`;
