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
	background-color: #333;
	font-family: 'Roboto Mono', monospace;
	color: ${props => props.theme.colorPrimary};
	
	& > div:first-of-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}
`

const Header = () => {

	const [controlPanelOpen, setControlPanelOpen] = useState(false);

	return (
		<StyledHeader>
			<div>
				<span>TYPE|TWO</span>
				<GearToggler controlPanelOpen={controlPanelOpen} setControlPanelOpen={setControlPanelOpen} />
			</div>
			<ControlPanel isOpen={controlPanelOpen} />
			
			
		</StyledHeader>
	)
}

export default Header;

