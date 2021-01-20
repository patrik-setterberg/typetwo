/**
 * TYPE TEST MAIN COMPONENT
 */

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import words from '../../assets/game/words.js';
import Input from './input.js';
import TestTimer from './test-countdown.js';
import Text from './text.js';
import TimeControls from './test-time-controls.js';

const TypeTestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  font-family: 'Roboto Mono', monospace;
  color: #fff;
  font-size: 1.5rem;
  margin-top: 200px; /* temp positioning */

  @media ${g.medium} {
    width: 90vw;
  }

  @media ${g.large} {
    width: 70vw;
  }
`

const TypeTest = () => {  

  // Retrieve a random word from array of words, return array of letters
  const getWord = (words) => {
    return words[Math.floor(Math.random() * words.length)].split('');
  }

  // Load a row (array) of words
  const loadRow = (wordArr) => {
    let rowArr = [];
  
    while (rowArr.length < g.WORDS_PER_ROW) {
      let word = getWord(wordArr);
      // Check that word hasn't already been chosen for current row.
      // THIS PROBABLY DOES NOT WORK
      // TODO "IMPROVE" (FIX)
      if (rowArr.indexOf(word) === -1) {
        rowArr.push(word);
      }
    }
    return rowArr;
  };

  // Load and return an array of rows of words
  const loadRows = (wordArr) => {
    return Array.from(Array(g.ROW_COUNT)).map((_) => {
      return loadRow(wordArr);
    });
  };

  // Playing state
  const [playing, setPlaying] = useState(false);

  /**
   * Stores selected test duration, get default from global settings.
   */
  const [testDuration, setTestDuration] = useState(g.DEFAULT_TEST_DURATION);

  /**
   * Track time left
   */
  const [timeLeft, setTimeLeft] = useState(testDuration);

  /**
   * Keep track of currentWord.
   * Input is compared with currentWord to progress in test.
   * Resets after full row has been matched.
   */
  const [currentWordInd, setCurrentWordInd] = useState(0);

  // Track progress on row for caret positioning.
  const [rowProgress, setRowProgress] = useState(0);

  /**
   * Array of rows. Each row consists of arrays of words.
   * Each word is an array of letters.
   */ 
  const [textRows, setTextRows] = useState(loadRows(words));

  /**
   * Update TextRows state.
   * Remove row from front of array, load a new row and push it onto array.
   */
  function updateTextRows() {
    let tempArr = textRows;
    tempArr.shift();
    tempArr.push(loadRow(words));
    setTextRows(tempArr);
    setRowProgress(0);
  }

  // Keep track of whether document (or any element inside it) is focused
  const [documentFocused, setDocumentFocus] = useState(false);

  const [inputValue, setInputValue] = useState('');

  // Compare array word with str from text-input
  const checkFullWord = (word, input) => {
    return word.join('') === input;
  }

  /**
   * Handle currentWord.
   * Increases currentWord and resets it if it reaches global WORDS_PER_ROW constant.
   */
  const updateCurrentWordInd = () => {
    if (currentWordInd === (g.WORDS_PER_ROW - 1)) {
      updateTextRows();
    }
    setCurrentWordInd((currentWordInd) => (currentWordInd + 1) % g.WORDS_PER_ROW);
  }

  /**
   * End test when timer expires or escape is pressed.
   * Stops test, clears input, resets currentWord,
   * loads a new set of rows of words and rewinds caret.
   */  
  const endTest = () => {
    setPlaying(false);
    setInputValue('');
    setCurrentWordInd(0);
    setTextRows(loadRows(words));
    setRowProgress(0);
    setTimeLeft(testDuration);
  }

  useEffect(() => {

    // Check page focus
    setInterval(() => {
      setDocumentFocus(document.hasFocus());
    }, g.FOCUS_CHECK_INTERVAL);

    // Start test on detecting letters being input
    const handleKeypress = (e) => {
      if (playing === false) {
        if (/[a-z|A-Z]/g.test(e.key) && e.key !== 'Enter') {
          setPlaying(true);
          setTimeLeft((timeLeft) => (timeLeft - 1));   
        }
      }

      // Detect spacebar press
      if (e.key === ' ') {
        // Check if input matches currentWord
        if (checkFullWord(textRows[0][currentWordInd], inputValue)) {
          setRowProgress((rowProgress) => (rowProgress + textRows[0][currentWordInd].length) + 1);
          updateCurrentWordInd();
          setInputValue('');
        }
      }
    };
    window.addEventListener('keypress', handleKeypress);

    // Keyup listener needed because 'keypress' doesn't detect Escape
    const handleKeyup = (e) => {
      if (e.key === 'Escape') {
        endTest();
      }
    };
    window.addEventListener('keyup', handleKeyup);
    
    return () => {
      window.removeEventListener('keypress', handleKeypress);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [loadRows, textRows]);

  // Timer for test duration.
  useEffect(() => {
    let timerInterval;
    if (playing === true) {
      timerInterval = setInterval(() => setTimeLeft((timeLeft) => (timeLeft - 1)), 1000);
    }

    return () => {
      clearInterval(timerInterval);
    }
  }, [playing]);

  // End test when timer reaches zero.
  useEffect(() => {
    if (timeLeft <= 0) {
      endTest();
    }
  }, [timeLeft, endTest]);

  useEffect(() => {
    setTimeLeft(testDuration);
  }, [testDuration]);

  return(
    <TypeTestWrapper focused={documentFocused}>
      <TestTimer timeLeft={timeLeft}/>
      <Text 
        focused={documentFocused}
        currentWord={textRows[0][currentWordInd]}
        currentWordInd={currentWordInd}
        rows={textRows}
        playing={playing}
        inputValue={inputValue}
        caretOffset={rowProgress + inputValue.length}
        />
      <Input
        currentWord={textRows[0][currentWordInd]}
        playing={playing}
        focused={documentFocused}
        checkWord={checkFullWord}
        inputValue={inputValue}
        setInputValue={setInputValue}
        updateCurrentWord={updateCurrentWordInd}
      />
      <div>{playing ? 'playing' : 'not playing'}</div>
      <TimeControls
        setTestDuration={setTestDuration}
        playing={playing}
      />
    </TypeTestWrapper>
  );
}

export default TypeTest;
