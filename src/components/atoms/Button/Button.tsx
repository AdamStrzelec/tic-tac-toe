import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps
	extends React.ButtonHTMLAttributes<Pick<HTMLButtonElement, 'disabled'>> {
	text: string;
	disabled?: boolean;
	isBorder?: boolean;
}

export const Button = ({
	text,
	disabled = false,
	isBorder = true,
	...props
}: ButtonProps) => (
	<StyledButton disabled={disabled} isBorder={isBorder} {...props}>
		{text}
	</StyledButton>
);

const StyledButton = styled.button<{ disabled?: boolean; isBorder: boolean }>(
	({ theme: { colors }, disabled, isBorder }) => css`
		border: ${isBorder ? 3 : 0}px solid ${colors.buttonText};
		outline: none;
		cursor: pointer;
		font-size: 20px;
		color: ${colors.buttonText};
		background-color: ${colors.buttonBackground};
		border-radius: 10px;
		font-weight: bold;
		padding: 5px 10px;
		opacity: ${disabled ? 0.5 : 1};
	`,
);
