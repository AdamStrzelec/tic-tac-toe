import React from 'react';
import { GlobalStyle } from 'src/global/global.styles';
import { Theme } from 'src/theme/theme';

function App() {
	return (
		<>
			<GlobalStyle />
			<Theme>
				<div></div>
			</Theme>
		</>
	);
}

export default App;
