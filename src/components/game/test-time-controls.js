/**
 * TYPE TEST TIME CONTROLS COMPONENT
 * Control panel for changing the test's duration
 */

import React from 'react';
import styled from 'styled-components';
import g from '../../globals.js';

const StyledButton = styled.button`

`

const StyledTimeControls = styled.div`
  opacity: ${props => props.playing ? '0' : '1'};
  transition: opacity 0.2s ease; // EHHHHHHHHHHH
  
  & button + button {
    margin-left: 0.5rem;
  }
`

const Button = (props) => {

  return (
    <StyledButton onClick={() => props.setTestLength(props.testLengthOption)}>
      {props.children}
    </StyledButton>
  );
}

const TimeControls = (props) => {

  const testLengthOptions = [
    g.TEST_LENGTH_SHORT,
    g.TEST_LENGTH_MEDIUM,
    g.TEST_LENGTH_LONG,
  ];

  return (
    <StyledTimeControls playing={props.playing}>
      {testLengthOptions.map((option, key) => {
        return (
          <Button
            setTestLength={props.setTestLength}
            testLengthOption={option}
            key={key}
          >
            {option}
          </Button>
        );
      })}
    </StyledTimeControls>
  );
}

export default TimeControls;