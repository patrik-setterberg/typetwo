import React from 'react';
import styled from 'styled-components';
import TimeControls from '../game/test-time-controls.js';
import KeyboardControls from './keyboard-controls.js';
import ThemeControls from './theme-controls.js';

const StyledControlPanel = styled.div`
	justify-content: space-evenly;
	display: ${props => props.isOpen ? 'flex' : 'none'};
	overflow: hidden;
	padding-bottom: var(--default-padding);
`

const ControlPanel = (props) => {
  return (
		<StyledControlPanel isOpen={props.isOpen}>
				<TimeControls
        setTestLength={props.setTestLength}
        playing={props.playing}
      />
			<ThemeControls />
			<KeyboardControls />
		</StyledControlPanel>
	);
}

export default ControlPanel;