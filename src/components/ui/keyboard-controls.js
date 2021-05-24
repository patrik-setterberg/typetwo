import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from './toggle-switch.js';

const KeyboardToggler = styled(ToggleSwitch)`

`

const KeyboardControlsContainer = styled.div`

`

const KeyboardControls = (props) => {

	return (
		<KeyboardControlsContainer>
			<KeyboardToggler
				Id={'keyboard-toggler'}
				text={'show keyboard'}
				defaultChecked={props.keyboardVisible}
				onChangeFunc={props.setKeyboardVisible}
			/>
		</KeyboardControlsContainer>
	);
}

export default KeyboardControls;