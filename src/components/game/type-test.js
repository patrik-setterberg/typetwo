/**
 * TYPE TEST MAIN COMPONENT
 */

import React, {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import Input from './input.js';
import TestTimer from './test-countdown.js';
import Text from './text.js';
import TimeControls from './test-time-controls.js';
import TestInstructions from './test-instructions.js';
import Keyboard from './onscreen-keyboard.js';

const StyledTypeTest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
`

const TypeTest = (props) => {  

  // Time left printed on screen
  const [timeLeft, setTimeLeft] = useState((props.testLength));

  /**
   * Keep track of currentWord.
   * Input is compared with currentWord to progress in test.
   */
  const [currentWordInd, setCurrentWordInd] = useState(0);

  const increaseCurrentWordInd = () => {
    setCurrentWordInd((currentWordInd) => (currentWordInd + 1));
  }

  /**
   * Subtract from currentWord's index.
   * Called when word array is updated (old words shifted, new words pushed).
   */
  const updateCurrentWordInd = (count) => {
    setCurrentWordInd(currentWordInd => currentWordInd - count);
  }

  const [caretPosition, setCaretPosition] = useState(0);

  // Value of test's hidden text-input.
  const [inputValue, setInputValue] = useState('');

  // Used to flash highlight incorrect letters when word is checked.
  const [wordIncorrect, setWordIncorrect] = useState(false);

  // Keep track of correctly input words for calculating score.
  const [correctWordsCount, setCorrectWordsCount] = useState(0);

  // Quickly flash a prop to Text component, used to reset caret animation.
  const [typedRecently, setTypedRecently] = useState(false);

  const updateTypedRecently = () => {
    setTypedRecently(true);
    setTimeout(() => {
      setTypedRecently(false);
    }, 1);
  }

  const [keyPressedRecently, setKeyPressedRecently] = useState('');

  const updateKeyPressedRecently = (key) => {
    setKeyPressedRecently(key);
    setTimeout(() => {
      setKeyPressedRecently('');
    }, 200);
  }

  const [lastKey, setLastKey] = useState('');

  const [shiftPressed, setShiftPressed] = useState(false);

  // Compare array word with str from text-input
  const checkFullWord = () => {
    return props.testWords[currentWordInd].join('') === inputValue;
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
    props.setTestWords(props.loadWords());
    setTimeLeft(props.testLength);
  }, []);

  const handleSpace = () => {
    // Check if input matches currentWord.
    if (checkFullWord()) {
      increaseCurrentWordInd();
      setInputValue('');
      setCorrectWordsCount((correctWordsCount) => (correctWordsCount + 1));
    } else {
      setWordIncorrect(true);
      setCaretPosition(inputValue.length);
      // PROBLEM: WILL THROW ERROR IF TEST ENDS DURING TIMEOUT. I THINK.
      setTimeout(() => {
        setWordIncorrect(false);
      }, 200);
    }
  }

  /**
   * Update which word index is current.
   * Shift words from array, then add some new words to replace them,
   */
  const [wordShiftCount, setWordShiftCount] = useState(0);

  useEffect(() => {
    if (wordShiftCount > 0) {
      updateCurrentWordInd(wordShiftCount);
      props.shiftWords(wordShiftCount);
      props.addWords(wordShiftCount);
      setWordShiftCount(0);
    }
  }, [wordShiftCount]);

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

  // Re-render when test-time-controls button is clicked
  useEffect(() => {
    setTimeLeft(props.testLength);
  }, [props.testLength]);

  return(
    <StyledTypeTest focused={props.documentIsFocused}>
      <TestInstructions
        playing={props.playing}
        focused={props.documentIsFocused}
      />
      <TestTimer
        playing={props.playing}
        timeLeft={timeLeft}
      />
      <Text
        testWords={props.testWords}
        focused={props.documentIsFocused}
        currentWord={props.testWords[currentWordInd]}
        currentWordInd={currentWordInd}
        setWordShiftCount={setWordShiftCount}
        playing={props.playing}
        inputValue={inputValue}
        caretPosition={caretPosition}
        typedRecently={typedRecently}
        updateTypedRecently={updateTypedRecently}
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
        endTest={endTest}
        caretPosition={caretPosition}
        setCaretPosition={setCaretPosition}
        updateTypedRecently={updateTypedRecently}
        updateKeyPressedRecently={updateKeyPressedRecently}
        shiftPressed={shiftPressed}
        setShiftPressed={setShiftPressed}
        setLastKey={setLastKey}
      />
      {/*<div>{props.playing ? 'playing' : 'not playing'}</div>*/}
      <TimeControls
        setTestLength={props.setTestLength}
        playing={props.playing}
      />
      <Keyboard
        playing={props.playing}
        keyPressedRecently={keyPressedRecently}
        correctKey={props.testWords[currentWordInd][inputValue.length - 1]}
        nextKey={props.testWords[currentWordInd][inputValue.length]}
        wordIncorrect={wordIncorrect}
        shiftPressed={shiftPressed}
        lastKey={lastKey}
        typedRecently={typedRecently}
      />
    </StyledTypeTest>
  );
}

export default TypeTest;
