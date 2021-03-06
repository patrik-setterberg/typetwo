import React from 'react';
import styled from 'styled-components';
import g, {largestMedium} from '../../globals.js';
import TimeControls from '../game/test-time-controls.js';
import KeyboardControls from './keyboard-controls.js';
import ThemeControls from './theme-controls.js';

const StyledControlPanel = styled.div`
	max-height: ${props => props.isOpen ? '8.75rem' : '0px'};
	opacity: ${props => props.isOpen ? '1' : '0'};
	overflow: hidden;
	padding: 0 1rem;
	background-color: ${props => props.theme.backgroundTertiary};
	transition: max-height 0.2s var(--default-timing), opacity 0.2s var(--default-timing);

	& > div {
		display: flex;
		justify-content: space-between;
		padding: 1rem 0;
	}

	@media ${g.large} {
		padding: 0 1.5rem;

		& > div {
			max-width: ${largestMedium+1}px;
			margin: 0 auto;
			padding: 1.5rem 0;
		}
	}
`

const ControlPanel = (props) => {
  return (
		<StyledControlPanel isOpen={props.isOpen}>
			<div>
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
			</div>
		</StyledControlPanel>
	);
}

export default ControlPanel;