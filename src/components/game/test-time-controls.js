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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  opacity: ${props => props.playing ? '0' : '1'};
  transition: opacity 0.2s ease;
  
  & button + button {
    margin-left: 0.5rem;
  }

  & span {
    font-size: 1.3rem;
    display: inline-block;
  }

  & div {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
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
      <span>Set test duration</span>
      <div>
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
      </div>  
    </StyledTimeControls>
  );
}

export default TimeControls;