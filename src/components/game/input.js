/**
 * TYPE TEST INPUT FIELD COMPONENT
 * Automatically focused text-input which is visually hidden.
 */

import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
// import g from '../../globals.js';

const StyledInput = styled.input`
/*
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 1.2rem;
  width: 50%;
  padding: 0.7rem 0.6rem;
  border-radius: 0.6rem;
  transition: opacity 0.225s ease;
*/
  opacity: 0;

  &:focus {
    outline: none;
  }
`

const Input = (props) => {

  // initiate reference to textinput element
  let textInput = useRef(null);

  // Keep input focused. Good or nah?
  useEffect(() => {
    let focusTimer = setInterval(() => {
      if (textInput.current === null) {
        clearInterval(focusTimer);
      } else {
        textInput.current.focus();
      }
    }, 200);

    return () => {
      clearInterval(focusTimer);
    }
  }, []);

  /* Filter text-input. 
  Remove everything except chars inside square brackets.
  Also remove whitespaces, incl. tabs, newlines.
  Finally, trim chars which exceed length of 2nd parameter (currentWord). */
  const filterInput = (input, maxLen) => {
    return input
      .replace(/[^a-zA-Z0-9-.,'!?]/g, "")
      .replace(/\s+/g, "")
      .substring(0, maxLen);
  }

  const handleKeyDown = (e) => {
    /**
     * START TEST.
     * Start test if key is a letter, i.e. if user started typing
     */
    if (/[a-z|A-Z]/g.test(e.key) && props.playing === false && e.key.length === 1) {
      props.setPlaying(!props.playing);
    }

    // Abort test if Escape is pressed
    if (e.key === 'Escape') {
      props.endTest();
    }

    if (e.key === ' ') {
      props.handleSpace();
    }
  }

  const handleKeyUp = (e) => {
    if (['ArrowLeft', 'ArrowRight', 'Control', 'Home', 'End'].includes(e.key)) {
     props.setCaretPosition(e.target.selectionStart);
    }
  }

  const handleInput = (e) => {
    let text = filterInput(e.target.value, props.currentWord.length);
    props.setInputValue(text);

    props.setCaretPosition(e.target.selectionStart);
  }

  return(
    <StyledInput
      type="text"
      autoComplete="off"
      value={props.inputValue}
      onKeyDown={(e) => {handleKeyDown(e)}}
      onKeyUp={(e) => {handleKeyUp(e)}}
      onInput={(e) => {
        if (props.playing === true && e.nativeEvent.data !== ' ') handleInput(e);
      }}
      id="text-input"
      aria-label="Type test input"
      ref={textInput}
      onBlur={() => {
        if (props.playing === true) {
          // Try to focus
          textInput.current.focus();
        }
      }}
    />
  );
}

export default Input;