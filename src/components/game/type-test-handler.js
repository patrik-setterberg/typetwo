/**
 * TYPE TEST SCREEN HANDLER
 * Wrapper component for TYPE TEST. Handles rendering of the test and the score screen.
 */

import React, {useState} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import TypeTest from './type-test.js';
import ScoreScreen from './score-screen.js';

const TypeTestWrapper = styled.div`
  width: 100%;
  margin: 200px auto 0;

  @media ${g.medium} {
    width: 90vw;
  }

  @media ${g.large} {
    width: 70vw;
  }
`

const TypeTestHandler = () => {

  const [playing, setPlaying] = useState(false);

  // Determines whether type test or score screen is displayed.
  const [testConcluded, setTestConcluded] = useState(false);

  // Stores selected test length (in seconds)
  const [testLength, setTestLength] = useState(g.TEST_LENGTH_DEFAULT);

  const [testScore, setTestScore] = useState(0);    

  function calcTestScore (correctWordCount) {
    // Calculate words per minute.
    let wpm = correctWordCount * (60 / testLength);
    setTestScore(wpm);
  }

  return (
    <TypeTestWrapper>
      {testConcluded ? /* Render score screen if test has concluded. */
        <ScoreScreen
        testScore={testScore}
        setTestConcluded={setTestConcluded}
        />
        : /* Otherwise render type test. */
        <TypeTest
          playing={playing}
          setPlaying={setPlaying}
          calcTestScore={calcTestScore}
          testLength={testLength}
          setTestLength={setTestLength}
          setTestConcluded={setTestConcluded}
        />
      }
    </TypeTestWrapper>
  ); 
}

export default TypeTestHandler;