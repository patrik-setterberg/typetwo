import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from './toggle-switch.js';

const KeyboardToggler = styled(ToggleSwitch)`
	display: inline-block;
`

const KeyboardControlsContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-end;

	& label {
		font-size: 0.875rem;
	}

	& > span {
		display: inline-block;
		text-transform: uppercase;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 1px;
	}

	& > div {
		margin-top: 1rem;
		padding-bottom: 1rem;
	}
`

const KeyboardControls = (props) => {

	return (
		<KeyboardControlsContainer>
			<span>Keyboard settings</span>
			<KeyboardToggler
				Id={'keyboard-toggler'}
				text={'Show keyboard'}
				defaultChecked={props.keyboardVisible}
				onChangeFunc={props.setKeyboardVisible}
			/>
		</KeyboardControlsContainer>
	);
}

export default KeyboardControls;