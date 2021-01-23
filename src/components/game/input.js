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
      textInput.current.focus();
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

  return(
    <StyledInput
      type="text"
      // MAYBE REMOVE PLACEHOLDER SINCE INPUT IS HIDDEN?
      placeholder={
        props.focused ? 
          // focused && playing : focused && not playing
          (props.playing ? '' : 'Begin typing to start test') :
          // not focused && playing : not focused && not playing
          (props.playing ? 'Test paused, focus to resume' : 'Click document to focus')
      }
      value={props.inputValue}
      onInput={(e) => {
        let text = filterInput(e.target.value, props.currentWord.length);
        props.setInputValue(text);
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