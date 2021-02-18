/**
 * TYPE TEST SCREEN HANDLER
 * Wrapper component for TYPE TEST. Handles rendering of the test and the score screen.
 */

import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import words from '../../assets/game/words.js';
import TypeTest from './type-test.js';
import ScoreScreen from './score-screen.js';

const TypeTestWrapper = styled.div`
  margin: 100px auto 0;
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

  // Stores selected test length (in seconds).
  const [testLength, setTestLength] = useState(g.TEST_LENGTH_DEFAULT);

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

  // Remove words from the from of testWords array.
  const shiftWords = (count) => {
    setTestWords(testWords => testWords.slice(count));
  }

  // Add some new words to the testWords array.
  const addWords = (count) => {
    let newWords = [];
    for (let i = 0; i < count; i++) {
      newWords.push(getWord(words));
    }
    setTestWords(testWords => testWords.concat(newWords));
  }

  const [highestScore, setHighestScore] = useState(() => {
    // Check if there is a cookie with a key which matches COOKIE_NAME.
    if (document.cookie.split(';').some((item) => item.trim().startsWith(g.COOKIE_NAME))) {
      return (
        // Return its value.
        document.cookie.split(';').find(row => row.startsWith(g.COOKIE_NAME)).split('=')[1]
      );
    } else {
      // If there is no matching cookie, set highestScore to 0.
      return 0;
    }
  });

  const [testScore, setTestScore] = useState(0);

  function calcTestScore (correctWordCount) {
    // Calculate words per minute.
    let wpm = correctWordCount * (60 / testLength); // https://www.speedtypingonline.com/typing-equations DO SOMETHING LIKE THIS INSTEAD
    setTestScore(wpm);
  }

  useEffect(() => {
    if (testConcluded === true && testScore > highestScore) {
      setHighestScore(testScore);
    }
  }, [testConcluded, testScore, highestScore, setHighestScore]);

  useEffect(() => {
    if (highestScore > 0) {
      document.cookie = `${g.SCORE_COOKIE_NAME}=${highestScore};max-age=${g.COOKIE_MAX_AGE}`;
      document.cookie = `${g.TIMESTAMP_COOKIE_NAME}=${Date.now()};max-age=${g.COOKIE_MAX_AGE}`;
    }
  }, [highestScore]);

  return (
    <TypeTestWrapper>
      {testConcluded ?
        /* Render score screen if test has concluded. */
        <ScoreScreen
        testScore={testScore}
        setTestConcluded={setTestConcluded}
        testConcluded={testConcluded}
        highestScore={highestScore}
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
          shiftWords={shiftWords}
          addWords={addWords}
        />
      }
    </TypeTestWrapper>
  ); 
}

export default TypeTestHandler;