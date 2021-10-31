/**
 * TYPE TEST MAIN COMPONENT
 */

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import Input from './input.js';
import TestTimer from './test-countdown.js';
import Text from './text.js';
import Keyboard from './onscreen-keyboard.js';

const StyledTypeTest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => props.theme.primary};
  font-size: 1.375rem;
`

const TypeTest = (props) => {  

  // Time left printed on screen
  const [timeLeft, setTimeLeft] = useState(props.testLength);

  /**
   * Keep track of currentWord.
   * Input is compared with currentWord to progress in test.
   */
  const [currentWordInd, setCurrentWordInd] = useState(0);

  const increaseCurrentWordInd = () => {
    setCurrentWordInd(currentWordInd => currentWordInd + 1);
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

  // Keep track of input words and characters for calculating score and accuracy.
  const [totalAttemptedWords, setTotalAttemptedWords] = useState(0);
  const [correctlyInputWords, setCorrectlyInputWords] = useState(0);
  const [totalInputChars, setTotalInputChars] = useState(0);
  const [correctlyInputChars, setCorrectlyInputChars] = useState(0);
  const [uncorrectedErrors, setUncorrectedErrors] = useState(0);

  /**
   * Resets above scoring state variables, necessary when aborting test before it ends.
   * Only needed then, because when game concludes naturally, entire TypeTest reloads which
   * resets all the variables.
   */
  function resetStatistics() {
    setTotalAttemptedWords(0);
    setCorrectlyInputWords(0);
    setTotalInputChars(0);
    setCorrectlyInputChars(0);
    setUncorrectedErrors(0);
  }

  /**
   * Quickly flash a prop.
   * Used for onscreen keyboard highlighting and to reset caret animation.
   * */
  const [typedRecently, setTypedRecently] = useState(false);

  const updateTypedRecently = () => {
    setTypedRecently(true);
    setTimeout(() => {
      setTypedRecently(false);
    }, 0);
  }

  const [lastKey, setLastKey] = useState('');

  const [spacePressedRecently, setSpacePressedRecently] = useState(false);

  const flashSpacePressedRecently = () => {
    setSpacePressedRecently(true);
    setTimeout(() => {
      setSpacePressedRecently(false);
    }, g.KEYBOARD_HIGHLIGHT_DURATION);
  }

  // Used to flash highlight incorrect letters when word is checked.
  const [wordIncorrect, setWordIncorrect] = useState(false);

  const flashWordIncorrect = () => {
    setWordIncorrect(true);
    setTimeout(() => {
      setWordIncorrect(false);
    }, g.KEYBOARD_HIGHLIGHT_DURATION);
  }

  /**
   * Handle shift keys:
   * Keep track of whether shift keys are currently or have recently been pressed.
   * Used for onscreen keyboard highlighting.
   * UNFORTUNATELY RIGHT SHIFT DETECTION SEEMS TO HAVE STOPPED WORKING?
   */
  const [leftShiftPressed, setLeftShiftPressed] = useState(false);
  const [rightShiftPressed, setRightShiftPressed] = useState(false);
  const [shiftPressedRecently, setShiftPressedRecently] = useState(false);

  useEffect(() => {
    if (!leftShiftPressed && !rightShiftPressed) {
      setShiftPressedRecently(true);
      setTimeout(() => {
        setShiftPressedRecently(false);
      }, g.KEYBOARD_HIGHLIGHT_DURATION);
    }
  }, [leftShiftPressed, rightShiftPressed]);

  // Compare array word with str from text-input
  function checkFullWord() {
    if (props.testWords[currentWordInd].join('') === inputValue) {
      return true;
    } else {
      flashWordIncorrect();
      return false;
    }
  }

  // Count how many characters in inputValue are correctly input (match currentWord).
  function checkCorrectLetters() {
    let correctLetters = 0;
    let inputValArray = Array.from(inputValue);
    inputValArray.forEach((val, ind) => {
      if (val === props.testWords[currentWordInd][ind]) {
        correctLetters++;
      }
    });
    return correctLetters;
  }

  /**
   * End test when timer expires or escape is pressed.
   * Stops test, clears input, resets currentWord,
   * loads a new set of rows of words and rewinds caret.
   */
  const endTest = () => {
    props.setPlaying(false);
    setInputValue('');
    setCurrentWordInd(0);
    props.setTestWords(props.loadWords());
    setTimeLeft(props.testLength);
  }

  const handleSpace = () => {
    // Advance to next word if at least one character has been entered.
    if (inputValue.length > 0) {
      // Update statistics.
      setTotalInputChars((totalInputChars) => (totalInputChars + inputValue.length));
      setTotalAttemptedWords((totalAttemptedWords) => (totalAttemptedWords + 1));
      if (checkFullWord()) setCorrectlyInputWords((correctlyInputWords) => (correctlyInputWords + 1));
      setCorrectlyInputChars((correctInputChars) => (correctInputChars + checkCorrectLetters()));
      setUncorrectedErrors((uncorrectedErrors) => (uncorrectedErrors + (inputValue.length - checkCorrectLetters())));

      increaseCurrentWordInd();
    // Else flash space (used for onscreen keyboard highlighting).
    } else {
      flashSpacePressedRecently();
    }

    // Reset inputValue and caret.
    setInputValue('');
    setCaretPosition(inputValue.length); // Always necessary?
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

    if (props.playing && props.documentIsFocused && !props.controlPanelOpen) {
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
  }, [props.playing, props.documentIsFocused, timeLeft, props.controlPanelOpen]);

  // End test when timer reaches zero.
  useEffect(() => {
    if (timeLeft <= 0) {
      props.setTestConcluded(true);
      props.setRawResults({
        // Checks total attempted words variable and adds one if user has "begun attempting" another word.
        totalAttemptedWords: totalAttemptedWords ? inputValue.length > 0 ? totalAttemptedWords + 1 : totalAttemptedWords : 1,
        /* Checks correctly input words variable and also account for word currently being input,
        i.e. if user finished typing a word but didn't have time to press "space" before test ended. */
        correctlyInputWords: correctlyInputWords ? checkFullWord() ? correctlyInputWords + 1 : correctlyInputWords : checkFullWord() ? 1 : 0,
        // Checks total input chars var and adds length of inputValue at the end of the test.
        totalInputChars: totalInputChars + inputValue.length,
        // Checks correct and incorrect letters variables, also accounts for current inputValue...
        correctlyInputChars: correctlyInputChars + checkCorrectLetters(),
        uncorrectedErrors: uncorrectedErrors + (inputValue.length - checkCorrectLetters()),
      });
      endTest();
    }
  }, [props.setTestConcluded, endTest, timeLeft]);

  // Re-render when test-time-controls button is clicked
  useEffect(() => {
    if (!props.playing) setTimeLeft(props.testLength);
  }, [props.testLength]);

  return(
    <StyledTypeTest focused={props.documentIsFocused}>
      <TestTimer
        playing={props.playing}
        timeLeft={timeLeft}
        documentIsFocused={props.documentIsFocused}
        controlPanelOpen={props.controlPanelOpen}
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
        controlPanelOpen={props.controlPanelOpen}
        spacePressedRecently={spacePressedRecently}
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
        flashSpacePressedRecently={flashSpacePressedRecently}
        setLastKey={setLastKey}
        setShiftPressedRecently={setShiftPressedRecently}
        setLeftShiftPressed={setLeftShiftPressed}
        setRightShiftPressed={setRightShiftPressed}
        controlPanelOpen={props.controlPanelOpen}
        resetStatistics={resetStatistics}
      />
      <Keyboard
        playing={props.playing}
        keyboardVisible={props.keyboardVisible}
        currentLayout={props.currentLayout}
        correctKey={props.testWords[currentWordInd][inputValue.length - 1]}
        nextKey={props.testWords[currentWordInd][inputValue.length] ? props.testWords[currentWordInd][inputValue.length] : ' '}
        spacePressedRecently={spacePressedRecently}
        wordIncorrect={wordIncorrect}
        shiftPressedRecently={shiftPressedRecently}
        leftShiftPressed={leftShiftPressed}
        rightShiftPressed={rightShiftPressed}
        lastKey={lastKey}
        typedRecently={typedRecently}
        endOfWord={inputValue.length === props.testWords[currentWordInd].length}
        inputLength={inputValue.length}
        currentWordLength={props.testWords[currentWordInd].length}
      />
    </StyledTypeTest>
  );
}

export default TypeTest;
