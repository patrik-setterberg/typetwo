import React, {useEffect} from 'react';
import styled from 'styled-components';

const StyledScoreScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  font-size: 2.5rem;
  text-align: center;
  & span {
    display: inline-block;
  }
  & span + span {
    font-size: 2rem;
    margin-top: 1.5rem;
    & > span {
      color: #888;
    }
  }
  & span + span + span {
    font-size: 1.5rem;
    margin-top: 1.5rem;
  }
`

const ScoreScreen = (props) => {

  useEffect(() => {

    const handleKeypress = (e) => {
      if (e.key === 'Enter') {
        props.setTestConcluded(false);
      }
    }
    window.addEventListener('keyup', handleKeypress);

    return () => {
      window.removeEventListener('keyup', handleKeypress);
    };
  }, [props]);

  return (
    <StyledScoreScreen>
      <span>{props.testScore} WPM!</span>
      <span>Best result: <span>n/a</span></span>
      <span>Press ENTER to run test again</span>
    </StyledScoreScreen>
  )
}

export default ScoreScreen;