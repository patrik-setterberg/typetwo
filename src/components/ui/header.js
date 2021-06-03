/**
 * HEADER COMPONENT.
 * Holds logo and control panel.
 */

import React from 'react';
import styled from 'styled-components';
import g, {largestMedium} from '../../globals.js';
import TestInstructions from '../game/test-instructions.js';
import GearToggler from './control-panel-toggler';
import ControlPanel from './control-panel';

const StyledHeader = styled.header`
	background-color: #1F1F21;
	font-family: var(--font-main);
	color: ${props => props.theme.highlight};
	
	& > div:first-of-type {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		margin: 0 auto;

		& > * {
			flex: 1;
		}
	}

	/* TEMP LOGO */
	& > div > span {
		letter-spacing: 1px;
		align-self: center;

		& > span {
			font-weight: 600;
		}
	}

	@media ${g.large} {
		& > div:first-of-type {
			padding: 1.5rem;
			max-width: ${largestMedium+1}px;
		}
	}
`

const Header = (props) => {

	return (
		<StyledHeader>
			<div>
				<span><span>TYPE</span>|TWO</span>
				<TestInstructions
					playing={props.playing}
					focused={props.documentIsFocused}
					controlPanelOpen={props.controlPanelOpen}
					testConcluded={props.testConcluded}
      	/>
				<GearToggler
					controlPanelOpen={props.controlPanelOpen}
					setControlPanelOpen={props.setControlPanelOpen}
				/>
			</div>
			<ControlPanel
				isOpen={props.controlPanelOpen}
				testLength={props.testLength}
				setTestLength={props.setTestLength}
				currentTheme={props.currentTheme}
				setTheme={props.setTheme}
				currentLayout={props.currentLayout}
				setCurrentLayout={props.setCurrentLayout}
				keyboardVisible={props.keyboardVisible}
				setKeyboardVisible={props.setKeyboardVisible}
			/>
		</StyledHeader>
	)
}

export default Header;

