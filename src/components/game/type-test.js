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

  /**
   * Track time left. Uses testLength state to get user selected test length
   */
  const [timeLeft, setTimeLeft] = useState(props.testLength);

  /**
   * Keep track of currentWord.
   * Input is compared with currentWord to progress in test.
   * Resets after full row has been matched.
   */
  const [currentWordInd, setCurrentWordInd] = useState(0);

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
  const [documentFocused, setDocumentFocus] = useState(false);

  const [inputValue, setInputValue] = useState('');

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
  const endTest = () => {
    props.setPlaying(false);
    setInputValue('');
    setCurrentWordInd(0);
    setTextRows(loadRows(words));
    setCurrentRow(0);
    setRowProgress(0);
    setTimeLeft(props.testLength);
  }

  // Check page focus
  useEffect(() => {
    let focusInterval = setInterval(() => {
      setDocumentFocus(document.hasFocus());
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
          setCorrectWordsCount((correctWordsCount) => (correctWordsCount + 1));
          setRowProgress((rowProgress) => (rowProgress + textRows[currentRow][currentWordInd].length) + 1);
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
  }, [loadRows, textRows, currentRow, currentWordInd, inputValue, endTest, updateCurrentWordInd]);

  // Timer for test duration.
  useEffect(() => {
    let timerInterval;
    if (props.playing === true) {
      timerInterval = setInterval(() => setTimeLeft((timeLeft) => (timeLeft - 1)), 1000);
    }

    return () => {
      clearInterval(timerInterval);
    }
  }, [props.playing]);

  

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
    <StyledTypeTest focused={documentFocused}>
      <TestTimer timeLeft={timeLeft} />
      <Text 
        focused={documentFocused}
        currentRow={currentRow}
        currentWord={textRows[currentRow][currentWordInd]}
        currentWordInd={currentWordInd}
        rows={textRows}
        playing={props.playing}
        inputValue={inputValue}
        caretOffset={rowProgress + inputValue.length}
        />
      <Input
        currentWord={textRows[currentRow][currentWordInd]}
        playing={props.playing}
        focused={documentFocused}
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
