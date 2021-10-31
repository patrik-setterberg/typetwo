/**
 * TYPE TEST SCREEN HANDLER
 * Wrapper component for TYPE TEST. Handles rendering of the test, score screen as well as the header.
 */

import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import g, {LAYOUTS} from '../../globals.js';
import words from '../../assets/game/words.js';
import Header from '../ui/header.js';
import TypeTest from './type-test.js';
import ScoreScreen from './score-screen.js';

const TypeTestWrapper = styled.div`

  & > div {
    margin: 0 auto;
    padding: 1.5rem;
  }

  @media ${g.medium} {
    & > div {
      width: min(80vw, 900px);
    }
  }

  @media ${g.large} {
    & > div {
      width: 900px;
      padding-top: 2.5rem;
    }
  }
`

const TypeTestHandler = (props) => {

  const [playing, setPlaying] = useState(false);

  const [controlPanelOpen, setControlPanelOpen] = useState(false);

  /**
   * Keep track of whether document is focused.
   * Used to blur text and pause test, if focus is lost.
   */
  const [documentIsFocused, setDocumentIsFocused] = useState(document.hasFocus());

  const handleBlur = useCallback(() => {
    setDocumentIsFocused(false);
  },[]);

  const handleFocus = useCallback(() => {
    setDocumentIsFocused(true);
  },[]);

  const [currentLayout, setCurrentLayout] = useState(g.KEYBOARD_DEFAULT_LAYOUT);

  const handleKeyDown = useCallback((event) => {
    switch(event.key) {
      case 'Escape':
        setControlPanelOpen(false);
        break;
      case LAYOUTS[currentLayout].CONTROL_PANEL_HOTKEY:
        setControlPanelOpen(!controlPanelOpen);
        break;
      case 'Tab':
        // Enable focus highlighting.
        document.body.classList.remove('no-outline');
        break;
      default:
        break;
    };
  },[currentLayout, controlPanelOpen]);

  useEffect(() => {
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.body.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, handleBlur, handleFocus]);

  // Stores selected test length (in seconds).
  const [testLength, setTestLength] = useState(g.TEST_LENGTH_DEFAULT);

  // Determines whether type test or score screen is displayed.
  const [testConcluded, setTestConcluded] = useState(false);

  const [keyboardVisible, setKeyboardVisible] = useState(g.KEYBOARD_DEFAULT_VISIBILITY);

  const getWord = (words) => {
    let word = '';
    do {
      // Retrieve a random word from static asset array of words.
      word = words[Math.floor(Math.random() * words.length)];
    } while ( // Make sure it is not already in current testWords.
      Array.from(props.testWords.map((testWord) => testWord.join(''))).includes(word)
    );
    // Return array of letters.
    return word.split('');
  }

  // Remove words from the front of testWords array.
  const shiftWords = (count) => {
    props.setTestWords(testWords => testWords.slice(count));
  }

  // Add some new words to the end of testWords array.
  const addWords = (count) => {
    let newWords = [];
    for (let i = 0; i < count; i++) {
      newWords.push(getWord(words));
    }
    props.setTestWords(testWords => testWords.concat(newWords));
  }

  const [highestScore, setHighestScore] = useState(() => {
    // Check if there is a cookie with a key which matches COOKIE_NAME.
    if (document.cookie.split(';').some((item) => item.trim().startsWith(g.SCORE_COOKIE_NAME))) {
      return (
        // Return its value.
        document.cookie.split(';').find(row => row.startsWith(g.SCORE_COOKIE_NAME)).split('=')[1]
      );
    } else {
      // If there is no matching cookie, set highestScore to 0.
      return 0;
    }
  });

  // Raw test results.
  const [rawResults, setRawResults] = useState({
    totalAttemptedWords: 0,
    correctlyInputWords: 0,
    totalInputChars: 0,
    correctlyInputChars: 0,
    uncorrectedErrors: 0,
  });

  // State object containing calculated test results as well as raw test results.
  const [testResults, setTestResults] = useState({
    wpm: 0,
    wordAccuracy: 0,
    letterAccuracy: 0,
    raw: {},
  });

  function calcTestResults (results) {
    let wordsPerMin = 0;
    let wordAcc = 0;
    let letterAcc = 0;

    // Calculate typed words per minute, rounded to integer.
    // https://www.speedtypingonline.com/typing-equations
    wordsPerMin = Math.round(((results.totalInputChars / 5) - results.uncorrectedErrors) / (testLength / 60));

    // Calculate accuracy in per cent.
    wordAcc = (results.correctlyInputWords / results.totalAttemptedWords) * 100;
    letterAcc = (results.correctlyInputChars / results.totalInputChars) * 100;

    setTestResults({
      wpm: wordsPerMin > 0 ? wordsPerMin : 0, // Can be a negative number if uncorrectedErrors > correctlyInputChars.
      wordAccuracy: wordAcc,
      letterAccuracy: !Number.isNaN(letterAcc) ? letterAcc : 0, // Can be NaN if totalInputChars is 0.
      raw: results,
    });
  }

  // Calculate test results when rawResults update (which happens when test ends).
  useEffect(() => {
    if (testConcluded === true) {
      calcTestResults(rawResults);
    }
  }, [rawResults]);

  // Check and possibly update highestScore.
  useEffect(() => {
    if (testConcluded === true && testResults.wpm > highestScore) {
      setHighestScore(testResults.wpm);
    }
  }, [testConcluded, testResults, highestScore, setHighestScore]);

  // Highest score cookies.
  useEffect(() => {
    if (highestScore > 0) {
      document.cookie = `${g.SCORE_COOKIE_NAME}=${highestScore};max-age=${g.COOKIE_MAX_AGE}`;
      document.cookie = `${g.TIMESTAMP_COOKIE_NAME}=${Date.now()};max-age=${g.COOKIE_MAX_AGE}`;
    }
  }, [highestScore]);

  return (
    <TypeTestWrapper>
      <Header
        controlPanelOpen={controlPanelOpen}
        setControlPanelOpen={setControlPanelOpen}
        currentTheme={props.currentTheme}
        setTheme={props.setTheme}
        testLength={testLength}
        setTestLength={setTestLength}
        currentLayout={currentLayout}
        setCurrentLayout={setCurrentLayout}
        keyboardVisible={keyboardVisible}
        setKeyboardVisible={setKeyboardVisible}
        playing={playing}
        documentIsFocused={documentIsFocused}
        testConcluded={testConcluded}
      />
      {testConcluded ?
        /* Render score screen if test has concluded. */
        <ScoreScreen
        setTestConcluded={setTestConcluded}
        testConcluded={testConcluded}
        highestScore={highestScore}
        controlPanelOpen={controlPanelOpen}
        testResults={testResults}
        />
        : /* Otherwise render type test. */
        <TypeTest
          playing={playing}
          setPlaying={setPlaying}
          setRawResults={setRawResults}
          testLength={testLength}
          testConcluded={testConcluded}
          setTestConcluded={setTestConcluded}
          documentIsFocused={documentIsFocused}
          testWords={props.testWords}
          setTestWords={props.setTestWords}
          loadWords={props.loadWords}
          shiftWords={shiftWords}
          addWords={addWords}
          controlPanelOpen={controlPanelOpen}
          keyboardVisible={keyboardVisible}
          currentLayout={currentLayout}
        />
      }
    </TypeTestWrapper>
  ); 
}

export default TypeTestHandler;