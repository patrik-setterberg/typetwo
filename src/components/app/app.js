import React, {Component} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import TypeGame from '../game/game.js';


const Main = styled.main`
	height: 100%;
	width: 100%;
	position: fixed;
	padding: var(--default-padding);
	background-color: ${g.bgcolor}; /* ??? */
`

class App extends Component {

	componentDidMount() {
		document.body.addEventListener('mousedown', function() {
			document.body.classList.add('no-outline');
		});

		document.body.addEventListener('keydown', function(event) {
			if (event.key === 'Tab') {
				document.body.classList.remove('no-outline');
			}
		});
	}

	render() {
		return(
			<>
				<Main>
					<TypeGame />
				</Main>
			</>
		);
	}
} 

export default App;