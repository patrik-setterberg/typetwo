import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import words from '../../assets/game/words.js';

const TypeTestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 500px;
  /* border: 2px solid ${props => props.focused ? '#0f0' : '#f00'}; */
  margin: 0 auto;
  font-family: 'Roboto Mono', monospace;
  color: #fff;
  font-size: 1.5rem;

  @media ${g.medium} {
    width: 90vw;
  }

  @media ${g.large} {
    width: 70vw;
  }

`

const Text = styled.div`
  color: ${props => props.focused ? '#fff' : 'transparent'};
  text-shadow: ${props => props.focused ? 'none' : '0 0 0.4rem #fff'};
`

const StyledInput = styled.input`
  opacity: 0;
`

const Input = () => {
  let textInput = useRef(null);
  useEffect(() => {
    textInput.current.focus();
  });

  return(
    <StyledInput
      type="text"
      aria-label="Type test input"
      ref={textInput}
      onBlur={() => {
        setInterval(() => {textInput.current.focus()}, 100);        
      }}
      onChange={() => {
        console.log(textInput.current.value); // gör nått vettigt här
      }}
    />
  );
}

// Retrieves a random word from imported array of words, return array of letters
const getWord = (words) => {
  return words[Math.floor(Math.random() * words.length)].split('');
}

// Load a word
let wordArr = getWord(words);

const TypeTest = () => {

  /* Initialize state to keep track of whether document (page) 
     or any element inside it is focused */
  const [documentFocused, checkDocumentFocus] = useState(false);

  // Set how often component checks if document is focused
  const FOCUS_CHECK_INTERVAL = 100;

  useEffect(() => {
    setInterval(() => {
      checkDocumentFocus(document.hasFocus());
    }, FOCUS_CHECK_INTERVAL);
  });
  
  return(
    <TypeTestWrapper focused={documentFocused}>
      <Text focused={documentFocused}>
        {wordArr.map((letter, i) => {
          return <span key={i}>{letter}</span>
        })}
      </Text>
      <Input />
    </TypeTestWrapper>
  );
}

export default TypeTest;
