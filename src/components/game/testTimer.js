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

/**
 * Countdown timer
 */
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