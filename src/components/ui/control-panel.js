import React from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import TimeControls from '../game/test-time-controls.js';
import KeyboardControls from './keyboard-controls.js';
import ThemeControls from './theme-controls.js';

const StyledControlPanel = styled.div`
	justify-content: space-evenly;
	display: ${props => props.isOpen ? 'flex' : 'none'};
	overflow: hidden;
	padding: 1rem;
	background-color: #242424;
	/*background: linear-gradient(to bottom, #1b1b1d, #29292B 90%);*/

	@media ${g.large} {
		padding: 1.5rem;
	}
`

const ControlPanel = (props) => {
  return (
		<StyledControlPanel isOpen={props.isOpen}>
			<TimeControls
				setTestLength={props.setTestLength}
				testLength={props.testLength}
      />
			<ThemeControls
				currentTheme={props.currentTheme}
				setTheme={props.setTheme}
			/>
			<KeyboardControls
				currentLayout={props.currentLayout}
				setCurrentLayout={props.setCurrentLayout}
				keyboardVisible={props.keyboardVisible}
				setKeyboardVisible={props.setKeyboardVisible}
			/>
		</StyledControlPanel>
	);
}

export default ControlPanel;