/**
 * TYPE TEST MAIN COMPONENT
 */

import React, {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import words from '../../assets/game/words.js';
import Input from './input.js';
import TestTimer from './test-countdown.js';
import Text from './text.js';
import TimeControls from './test-time-controls.js';

const StyledTypeTest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
`

const TypeTest = (props) => {  

  // Retrieve a random word from array of words, return array of letters
  const getWord = (words) => {
    return words[Math.floor(Math.random() * words.length)].split('');
  }

  // Load a row (array) of words
  const loadRow = useCallback((wordArr) => {
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
  }, []);

  // Load and return an array of rows of words.
  const loadRows = useCallback((wordArr) => {
    return Array.from(Array(g.ROW_COUNT)).map((_) => {
      return loadRow(wordArr);
    });
  }, [loadRow]);

  // Track time left. Uses testLength state to get user selected test length.
  const [timeLeft, setTimeLeft] = useState(props.testLength);

  /**
   * Keep track of currentWord.
   * Input is compared with currentWord to progress in test.
   * Resets after full row has been matched.
   */
  const [currentWordInd, setCurrentWordInd] = useState(0);

  // Test uses first and second row of text for input.
  const [currentRow, setCurrentRow] = useState(0);

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
  }

  // Keep track of whether document (or any element inside it) is focused.
  const [documentIsFocused, setDocumentIsFocused] = useState(false);

  const [inputValue, setInputValue] = useState('');

  // Used to flash highlight incorrect letters when word is checked.
  const [wordIncorrect, setWordIncorrect] = useState(false);

  // Keep track of correctly input words for calculating score.
  const [correctWordsCount, setCorrectWordsCount] = useState(0);

  // Compare array word with str from text-input
  const checkFullWord = (word, input) => {
    return word.join('') === input;
  }

  /**
   * Increases currentWord and resets it if it reaches end of row.
   * Also triggers text row shifting.
   */
  const updateCurrentWordInd = () => {
    if (currentWordInd === (g.WORDS_PER_ROW - 1)) {
      if (currentRow < 1) {
        setCurrentRow(1);
      } else {
        updateTextRows();
      }
      setRowProgress(0);
    }
    setCurrentWordInd((currentWordInd) => (currentWordInd + 1) % g.WORDS_PER_ROW);
  }

  /**
   * End test when timer expires or escape is pressed.
   * Stops test, clears input, resets currentWord and currentRow,
   * loads a new set of rows of words and rewinds caret.
   */  
  const endTest = useCallback(() => {
    props.setPlaying(false);
    setInputValue('');
    setCurrentWordInd(0);
    setTextRows(loadRows(words));
    setCurrentRow(0);
    setRowProgress(0);
    setTimeLeft(props.testLength);
  }, [props, loadRows]);

  // Check page focus
  useEffect(() => {
    let focusInterval = setInterval(() => {
      setDocumentIsFocused(document.hasFocus());
    }, g.FOCUS_CHECK_INTERVAL);

    return () => {
      clearInterval(focusInterval);
    }
  }, []);
 
  useEffect(() => { 

    // Start test on detecting letters being input
    const handleKeypress = (e) => {
      if (props.playing === false) {
        if (/[a-z|A-Z]/g.test(e.key) && e.key !== 'Enter') {
          props.setPlaying(true);
          setTimeLeft((timeLeft) => (timeLeft - 1));
        }
      }

      // Detect spacebar press
      if (e.key === ' ') {
        // Check if input matches currentWord
        if (checkFullWord(textRows[currentRow][currentWordInd], inputValue)) {
          setRowProgress((rowProgress) => (rowProgress + textRows[currentRow][currentWordInd].length) + 1);
          updateCurrentWordInd();
          setInputValue('');
          setCorrectWordsCount((correctWordsCount) => (correctWordsCount + 1));
        } else {
          setWordIncorrect(true);
          // PROBLEM: WILL THROW ERROR IF TEST ENDS DURING TIMEOUT.
          setTimeout(() => {
            setWordIncorrect(false);
          }, 200);
        }
      }
    };
    window.addEventListener('keypress', handleKeypress);

    return () => {
      window.removeEventListener('keypress', handleKeypress);
    };
    // PROBLEM: LISTENERS ADDED AND REMOVED EVERY TIME THINGS IN DEPENDENCY ARRAY ARE UPDATED
  }, [loadRows, textRows, currentRow, currentWordInd, inputValue, updateCurrentWordInd]);

  // Abort game if Escape is pressed.
  useEffect(() => {
    const handleKeyup = (e) => {
      if (e.key === 'Escape') {
        endTest();
      }
    };
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
    }
  }, [endTest]);

  // Timer for test duration countdown.
  useEffect(() => {

    let timerInterval;
    let testDuration = 0;

    if (props.playing === true) {
      /**
       * Runs a clock which decreases timeLeft by 1 every second.
       * Timer clears if document loses focus. Restarts when focus is regained.
       * Technically inaccurate because it gives a < 1s leeway when regaining focus.
       */
      timerInterval = setInterval(() => {
        
        // "Pauses" (at least, do nothing) if focus is lost.
        if (documentIsFocused === true) {
          testDuration += g.TEST_TICK_SPEED;
          if (testDuration % 1000 === 0) {
            setTimeLeft((timeLeft) => (timeLeft - 1));
          }
        }
      }, g.TEST_TICK_SPEED);
    };

    return () => {
      clearInterval(timerInterval);
    }
  }, [props.playing, documentIsFocused]);

  // End test when timer reaches zero.
  useEffect(() => {
    if (timeLeft <= 0) {
      props.calcTestScore(correctWordsCount);
      endTest();
      props.setTestConcluded(true);
    }
  }, [props.calcTestScore, props.setTestConcluded, endTest, timeLeft, correctWordsCount]);

  // Rerender when test-time-controls button is clicked
  useEffect(() => {
    setTimeLeft(props.testLength);
  }, [props.testLength]);

  return(
    <StyledTypeTest focused={documentIsFocused}>
      <TestTimer timeLeft={timeLeft} />
      <Text 
        focused={documentIsFocused}
        currentRow={currentRow}
        currentWord={textRows[currentRow][currentWordInd]}
        currentWordInd={currentWordInd}
        rows={textRows}
        playing={props.playing}
        inputValue={inputValue}
        caretOffset={rowProgress + inputValue.length}
        wordIncorrect={wordIncorrect}
        />
      <Input
        currentWord={textRows[currentRow][currentWordInd]}
        playing={props.playing}
        focused={documentIsFocused}
        checkWord={checkFullWord}
        inputValue={inputValue}
        setInputValue={setInputValue}
        updateCurrentWord={updateCurrentWordInd}
      />
      <div>{props.playing ? 'playing' : 'not playing'}</div>
      <TimeControls
        setTestLength={props.setTestLength}
        playing={props.playing}
      />
    </StyledTypeTest>
  );
}

export default TypeTest;
