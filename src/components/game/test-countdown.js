/**
 * TYPE TEST COUNTDOWN TIME
 * Prints time left on screen.
 */

import React from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`

const Numbers = styled.span`
  color: #fff;
  font-size: 3rem;
`

const TestTimer = (props) => {
  return(
    <TimerWrapper>
      <Numbers>
        {props.timeLeft}
      </Numbers>      
    </TimerWrapper>
  );
}

export default TestTimer;