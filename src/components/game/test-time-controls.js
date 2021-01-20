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

  const handleClick = (duration) => {
    props.setTestDuration(duration);
  }

  return (
    <StyledButton onClick={() => handleClick(props.duration)}>
      {props.children}
    </StyledButton>
  );
}

const TimeControls = (props) => {

  const durationOptions = [
    g.TEST_DURATION_SHORT,
    g.TEST_DURATION_MEDIUM,
    g.TEST_DURATION_LONG,
  ];

  return (
    <StyledTimeControls playing={props.playing}>
      {durationOptions.map((option, key) => {
        return (
          <Button
            setTestDuration={props.setTestDuration}
            duration={option}
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