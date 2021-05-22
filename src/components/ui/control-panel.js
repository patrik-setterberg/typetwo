import React from 'react';
import styled from 'styled-components';

const StyledControlPanel = styled.div`
	max-height: ${props => props.isOpen ? 'none' : 0};
`

const ControlPanel = (props) => {
  return (
		<StyledControlPanel isOpen={props.isOpen}>
				hello
		</StyledControlPanel>
	);
}

export default ControlPanel;