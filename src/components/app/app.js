import React, {useEffect} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import TypeTest from '../game/game.js';


const Main = styled.main`
	height: 100%;
	width: 100%;
	position: fixed;
	padding: var(--default-padding);
	background-color: ${g.bgcolor}; /* ??? */
`

const App = () => {

	useEffect(() => {
		// Only show focus outline when using keyboard.
		document.body.addEventListener('mousedown', function() {
			document.body.classList.add('no-outline');
		});

		document.body.addEventListener('keydown', function(event) {
			if (event.key === 'Tab') {
				document.body.classList.remove('no-outline');
			}
		});
	});

	return(
		<>
			<Main>
				<TypeTest />
			</Main>
		</>
	);

} 

export default App;