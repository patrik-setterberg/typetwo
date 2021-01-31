/**
 * TYPE TEST MAIN COMPONENT
 */

import React, {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import Input from './input.js';
import TestTimer from './test-countdown.js';
import Text from './text.js';
import TimeControls from './test-time-controls.js';
import TestInstructions from './test-instructions.js';

const StyledTypeTest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
`


const TypeTest = (props) => {  

  /*
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
  */

  // Time left printed on screen
  const [timeLeft, setTimeLeft] = useState((props.testLength));

  /**
   * Keep track of currentWord.
   * Input is compared with currentWord to progress in test.
   * Resets after full row has been matched.
   */
  const [currentWordInd, setCurrentWordInd] = useState(0);

  // Test uses first and second row of text for input.
  // const [currentRow, setCurrentRow] = useState(0);

  // Track progress on row for caret positioning.
  // const [rowProgress, setRowProgress] = useState(0);

  /**
   * Array of rows. Each row consists of arrays of words.
   * Each word is an array of letters.
   */ 
  // const [textRows, setTextRows] = useState(loadRows(words));

  /**
   * Update TextRows state.
   * Remove row from front of array, load a new row and push it onto array.
   *
  function updateTextRows() {
    let tempArr = textRows;
    tempArr.shift();
    tempArr.push(loadRow(words));
    setTextRows(tempArr);
  }
  */

  const [caretPosition, setCaretPosition] = useState(0);

  const [inputValue, setInputValue] = useState('');

  // Used to flash highlight incorrect letters when word is checked.
  const [wordIncorrect, setWordIncorrect] = useState(false);

  // Keep track of correctly input words for calculating score.
  const [correctWordsCount, setCorrectWordsCount] = useState(0);

  // Compare array word with str from text-input
  const checkFullWord = () => {
    return props.testWords[currentWordInd].join('') === inputValue;
  }

  // Bump currentWord
  const updateCurrentWordInd = () => {
    setCurrentWordInd((currentWordInd) => (currentWordInd + 1));
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
    props.setTestWords(props.loadWords())
    //setTextRows(loadRows(words));
    //setCurrentRow(0);
    //setRowProgress(0);
    setTimeLeft(props.testLength);
  }, []);

    /*
    useEffect(() => {
      if (props.playing === true) {
        // Do thing when test starts
      }
    }, [props.playing])
    */

  const handleSpace = () => {
    // Check if input matches currentWord.
    if (checkFullWord()) {
      //setRowProgress((rowProgress) => (rowProgress + textRows[currentRow][currentWordInd].length) + 1); // rows shit
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

  // Timer for test duration countdown.
  useEffect(() => {
    let timerInterval;

    if (props.playing === true && props.documentIsFocused === true) {
      /**
       * Runs a clock which decreases timeLeft by 1 every second.
       * Timer clears if document loses focus. Restarts when focus is regained.
       * BAD SOLUTION:
       * Drifts - These "seconds" are slightly longer than normal seconds, about ~1s over 30s
       * Inaccurate / bad because it gives a < 1s leeway when regaining focus.
       * FIX A BETTER TIMER AND TIME HANDLING STRATEGY
       */
      timerInterval = setInterval(() => {
        setTimeLeft((timeLeft) => (timeLeft - 1));
      }, 1000);
    };

    return () => {
      clearInterval(timerInterval);
    }
  }, [props.playing, props.documentIsFocused, timeLeft]);

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
    <StyledTypeTest focused={props.documentIsFocused}>
      <TestInstructions
        playing={props.playing}
        focused={props.documentIsFocused}
      />
      <TestTimer timeLeft={timeLeft} />
      <Text
        testWords={props.testWords}
        focused={props.documentIsFocused}
        currentWord={props.testWords[currentWordInd]}
        currentWordInd={currentWordInd}
        playing={props.playing}
        inputValue={inputValue}
        caretPosition={caretPosition}
        //caretOffset={rowProgress + inputValue.length}
        wordIncorrect={wordIncorrect}
        />
      <Input
        currentWord={props.testWords[currentWordInd]}
        playing={props.playing}
        setPlaying={props.setPlaying}
        focused={props.documentIsFocused}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSpace={handleSpace}
        checkWord={checkFullWord}
        endTest={endTest}
        caretPosition={caretPosition}
        setCaretPosition={setCaretPosition}
      />
      {/*<div>{props.playing ? 'playing' : 'not playing'}</div>*/}
      <TimeControls
        setTestLength={props.setTestLength}
        playing={props.playing}
      />
    </StyledTypeTest>
  );
}

export default TypeTest;
