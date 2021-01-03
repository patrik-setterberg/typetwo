import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
// import g from '../../globals.js';

/* STYLES */
const StyledInput = styled.input`
  margin-top: 1rem;
  margin-bottom: 1rem; // Temp probably
  font-family: 'Roboto Mono', monospace;
  font-size: 1.2rem;
  width: 50%;
  padding: 0.7rem 0.6rem;
  border-radius: 0.6rem;

  opacity: ${props => props.focused ? '1' : '0.5'};
  transition: opacity 0.225s ease;

  &:focus {
    outline: none;
  }
`

const Input = (props) => {

  const [inputValue, setInputValue] = useState('');

  // initiate reference to textinput element
  let textInput = useRef(null);

  let focusTimer = null;

  useEffect(() => {
    // Focus on load and change
    textInput.current.focus();

    // Clear text-input when escape is pressed
    const keyUpHandler = (e) => {
      if (e.key === 'Escape') {
        setInputValue('');
      }
    };
    document.addEventListener('keyup', keyUpHandler);

    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    };
  });

  return(
    <StyledInput
      type="text"
      placeholder={
        props.focused ? 
          // focused && playing : focused && not playing
          (props.playing ? '' : 'Begin typing to start test') :
          // not focused && playing : not focused && not playing
          (props.playing ? 'Test paused, focus to resume' : 'Click document to focus')
      }
      value={inputValue}
      onInput={(e) => {
        /* Filter text-input. 
           Remove everything except chars inside square brackets.
           Also remove whitespaces, incl. tabs, newlines. */
        let text = e.target.value.replace(/[^a-zA-Z0-9-.,'!?]/g, "").replace(/\s+/g, "");
        setInputValue(text);
      
        // Detect space weirdly???
        if (e.nativeEvent.data === ' ') {
          // Check if input matches currentWord
          if (props.checkWord(props.currentWord, text)) {
            props.updateCurrentWord();
            setInputValue('');
          } 
        }
      }}
      id="text-input"
      aria-label="Type test input"
      ref={textInput}
      onBlur={() => {
        if (props.playing === true) {
          // Try to focus
          focusTimer = window.setInterval(() => {
            textInput.current.focus()
          }, 100);
        }
      }}
      onFocus={() => {
      window.clearInterval(focusTimer);
      }}
    />
  );
}

export default Input;