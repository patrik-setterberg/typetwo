/**
 * TYPE TEST TIME CONTROLS COMPONENT
 * Control panel for changing the test's duration
 */

import React from 'react';
import styled, {css} from 'styled-components';
import g from '../../globals.js';

const StyledButton = styled.button`
  padding: 0.375rem 0.75rem;
  background-color: ${props => props.theme.highlight};
  border-radius: 0.75rem;
  border: 0;
  color: ${props => props.theme.backgroundTertiary};
  font-family: var(--font-main);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background-color: ${props => props.theme.primary};
  }

  ${props => props.selectedOption && css`
    background-color: ${props => props.theme.primary}; /* not exactly beautiful. */`
  }
`

const StyledTimeControls = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 0.875rem;
  transition: opacity 0.2s ease;
  
  & button + button {
    margin-left: 0.5rem;
  }

  & span {
    display: inline-block;
    width: fit-content;

    &:first-child {
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }

  & div {
    display: flex;
    align-items: center;
    margin-top: 1rem;

    & button:last-of-type {
      margin-right: 1rem;
    }
  }
`

const Button = (props) => {
  return (
    <StyledButton
      selectedOption={props.selectedOption}
      onClick={() => props.setTestLength(props.testLengthOption)}
    >
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
              selectedOption={option === props.testLength}
              key={key}
            >
              {option}
            </Button>
          );
        })}
        <span>seconds</span>
      </div>  
    </StyledTimeControls>
  );
}

export default TimeControls;