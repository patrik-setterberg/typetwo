/**
 * HEADER COMPONENT.
 * Holds logo and control panel.
 */


/**
 * HERE WE WANT:
 * LOGO
 * CONTROL PANEL TOGGLER
 */

/**
 * CONTROL PANEL:
 * Set test duration buttons
 * Onscreen keyboard toggler
 * Keyboard layout selector (dropdown?)
 * Theme picker
 */

/* SHOULD WE PERHAPS STORE SETTINGS IN A COOKIE OR SOMETHING? */

import React, {useState} from 'react';
import styled from 'styled-components';
import GearToggler from './control-panel-toggler';
import ControlPanel from './control-panel';

const StyledHeader = styled.header`
	background-color: #1b1b1d;
	font-family: 'Roboto Mono', monospace;
	color: ${props => props.theme.colorPrimary};
	
	& > div:first-of-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}

	/* TEMP */
	& > div > span {
		letter-spacing: 1px;
	}
	& > div > span > span {
		font-weight: 700;
	}
`

const Header = (props) => {

	return (
		<StyledHeader>
			<div>
				<span><span>TYPE</span>|TWO</span>
				<GearToggler
					controlPanelOpen={props.controlPanelOpen}
					setControlPanelOpen={props.setControlPanelOpen}
				/>
			</div>
			<ControlPanel
				isOpen={props.controlPanelOpen}
				currentLayout={props.currentLayout}
				setCurrentLayout={props.setCurrentLayout}
				keyboardVisible={props.keyboardVisible}
				setKeyboardVisible={props.setKeyboardVisible}
				setTestLength={props.setTestLength}
			/>
			
			
		</StyledHeader>
	)
}

export default Header;

