import React, {useEffect} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';

const TestEnded = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 2rem;
  margin-top: 0.75rem;
  margin-bottom: 2rem;
`

const ScoreRow = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 1.5rem;

  & span {
    font-size: 2rem;
    font-weight: 600;
    color: ${props => props.theme.highlight}
  }
`

const WPM = styled.span`
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
`

const Statistics = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  font-size: 0.9375rem;

  & h2 {
    width: 100%;
    background-color: ${props => props.theme.backgroundSecondary};
    padding: 1.125rem;
    font-size: 1.25rem;
    text-transform: uppercase;
  }

  & div {
    padding: 1.125rem;
    background-color: ${props => props.theme.backgroundTertiary};
    transition: background-color 0.2s ease;
    flex: 1;

    &:hover {
      background-color: ${props => props.theme.backgroundFourthenary};
    }

    & > span {
      display: block;

      & > span {
        margin-left: auto;
        color: ${props => props.theme.highlight};
        font-weight: 600;
      }

      & + span {
        margin-top: 1rem;
      }
    }

    // Test length
    &:last-of-type {
      flex: 1 1 auto;
      width: 100%;
      border-top: 3px solid ${props => props.theme.backgroundPrimary};
    }
  }

  @media ${g.small} {
    & div {
      flex: 1 1 auto;
      width: 100%;

      &:nth-child(2) {
        border-bottom: 3px solid ${props => props.theme.backgroundPrimary};
      }
    }
  }

  @media ${g.atleastMedium} {
    & div:nth-child(2) {
      border-right: 2px solid ${props => props.theme.backgroundPrimary};
    }

    & div:nth-child(3) {
      border-left: 2px solid ${props => props.theme.backgroundPrimary};
    }
  }
`

const StyledScoreScreen = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.primary};
  font-size: 1.5rem;
  font-size: 2.5rem;

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
      highestScore={props.highestScore}
    >
      <TestEnded>Test results</TestEnded>
      <ScoreRow>Typing speed: <span>{props.testResults.wpm}</span> WPM!</ScoreRow>
      <WPM>(words per minute)</WPM>
      {props.highestScore === props.testResults.wpm ?
        <ScoreRow><span>New high score!</span></ScoreRow>
        :
        <ScoreRow>High score: <span>{props.highestScore}</span> WPM</ScoreRow>
      }
      <Statistics>
        <h2>Statistics</h2>
        <div>
          <span>Word accuracy: <span>{Math.round((props.testResults.wordAccuracy + Number.EPSILON) * 100) / 100}%</span></span>
          <span>Total words: <span>{props.testResults.raw.totalAttemptedWords}</span></span>
          <span>Correct words: <span>{props.testResults.raw.correctlyInputWords}</span></span>
        </div>
        <div>
          <span>Character accuracy: <span>{Math.round((props.testResults.letterAccuracy + Number.EPSILON) * 100) / 100}%</span></span>
          <span>Total characters: <span>{props.testResults.raw.totalInputChars}</span></span>
          <span>Correct characters: <span>{props.testResults.raw.correctlyInputChars}</span></span>
        </div>
        <div>
          <span>Test length: <span>{props.testResults.testLength}</span> seconds</span>
        </div>
      </Statistics>
    </StyledScoreScreen>
  )
}

export default ScoreScreen;