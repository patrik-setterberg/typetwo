/**
 * TYPE TEST SCREEN HANDLER
 * Wrapper component for TYPE TEST. Handles rendering of the test and the score screen.
 */

import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import words from '../../assets/game/words.js';
import TypeTest from './type-test.js';
import ScoreScreen from './score-screen.js';

const TypeTestWrapper = styled.div`
  margin: 200px auto 0;
  padding: 1.5rem;

  @media ${g.medium} {
    width: min(80vw, 900px);
  }

  @media ${g.large} {
    width: 900px;
  }
`

const TypeTestHandler = (props) => {

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

  // Retrieve a random word from array of words, return array of letters
  const getWord = useCallback((words) => {
    return words[Math.floor(Math.random() * words.length)].split('');
  },[]);

  // Load an array of words. Removes duplicates before returning.
  const loadWords = useCallback(() => {
    let wordArr = Array.from(Array(g.TEST_WORD_COUNT)).map((_) => {
      return getWord(words);
    });
    return ([...new Set(wordArr)]);
  },[getWord]);

  const [testWords, setTestWords] = useState(loadWords());

  return (
    <TypeTestWrapper>
      {testConcluded ? /* Render score screen if test has concluded. */
        <ScoreScreen
        testScore={testScore}
        setTestConcluded={setTestConcluded}
        testConcluded={testConcluded}
        />
        : /* Otherwise render type test. */
        <TypeTest
          playing={playing}
          setPlaying={setPlaying}
          calcTestScore={calcTestScore}
          testLength={testLength}
          setTestLength={setTestLength}
          testConcluded={testConcluded}
          setTestConcluded={setTestConcluded}
          documentIsFocused={props.documentIsFocused}
          testWords={testWords}
          setTestWords={setTestWords}
          loadWords={loadWords}
        />
      }
    </TypeTestWrapper>
  ); 
}

export default TypeTestHandler;