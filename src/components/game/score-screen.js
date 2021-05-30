import React, {useEffect} from 'react';
import styled from 'styled-components';

const StyledScoreScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => props.theme.primary};
  font-size: 1.5rem;
  font-size: 2.5rem;
  text-align: center;

  /* TODO: Clean up this span nonsense. Redesign this whole page while you're at it. */

  & span {
    display: inline-block;
  }
  & span + span {
    font-size: 2rem;
    margin-top: 1.5rem;
    & > span {
      color: ${props => props.highestScore === props.testScore ? props.theme.highlight : props.theme.primary};
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
      if (props.testConcluded && !props.controlPanelOpen) {
        if (e.key === 'Enter') {
          e.preventDefault();
          props.setTestConcluded(!props.testConcluded);
        }
      }
    }
    window.addEventListener('keydown', handleKeypress);

    return () => {
      window.removeEventListener('keydown', handleKeypress);
    };
  }, [props, props.setTestConcluded, props.testConcluded]);

  return (
    <StyledScoreScreen
      testScore={props.testScore}
      highestScore={props.highestScore}
    >
      <span>{props.testScore} WPM!</span>
      <span>Best result: <span>{props.highestScore}</span></span>
      {props.highestScore === props.testScore ?
        <span>New best result!</span>
        :
        <></>
      }
    </StyledScoreScreen>
  )
}

export default ScoreScreen;