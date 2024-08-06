import React from 'react';
import { GlobalStyle } from 'src/global/global.styles';
import { Theme } from 'src/theme/theme';
import { TicTacToe } from './components/organisms/TicTacToe/TicTacToe';

function App() {
	return (
		<>
			<GlobalStyle />
			<Theme>
				<div>
					<TicTacToe />
				</div>
			</Theme>
		</>
	);
}

export default App;
