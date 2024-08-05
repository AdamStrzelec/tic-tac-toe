import React from 'react';
import { ThemeProvider } from 'styled-components';

export const theme = {
	colors: {
		white: '#ffffff',
		text: '#000000',
	},
};

interface ThemeProps {
	children: React.ReactNode;
}

export type ThemeType = typeof theme;

export const Theme = ({ children }: ThemeProps) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);
