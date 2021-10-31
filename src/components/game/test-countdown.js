/**
 * TYPE TEST COUNTDOWN TIME
 * Prints time left on screen.
 */

import React from 'react';
import styled, {css} from 'styled-components';

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`

const Numbers = styled.span`
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 3.5rem;
  color: ${props => props.theme.primary};
  transition: color 0.2s var(--default-timing);

  ${props => props.playing && css`
    color: #888;
    transition: color 1.5s linear;`
  }

  & svg {
    fill: ${props => props.theme.primary};
  }
`

const TestTimer = (props) => {
  return(
    <TimerWrapper>
      <Numbers playing={props.playing}>
        {/* Display pause icon or time left countdown. */}
        {(props.playing && (props.controlPanelOpen || !props.documentIsFocused)) ?
          <svg width="1ch" viewBox="0 0 156 203" xmlns="http://www.w3.org/2000/svg"><rect width="52" height="203"/><rect x="104" width="52" height="203"/></svg> :
          props.timeLeft}
      </Numbers>      
    </TimerWrapper>
  );
}

export default TestTimer;