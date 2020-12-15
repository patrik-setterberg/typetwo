import React, { useEffect } from 'react';
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
  border: 2px solid #222;
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

`

const StyledInput = styled.input`
  opacity: 0;
`

const Input = () => {
  let textInput = null;
  useEffect(() => {
    textInput.focus();
  });

  return(
    <StyledInput
      type="text"
      id="hidden-input"
      aria-label="Type test input"
      ref={(input) => {
        textInput = input;
      }}
      onBlur={() => {
        setInterval(() => {
          textInput.focus();}, 50);
      }}
      onChange={() => {
        console.log(textInput.value); // gör nått vettigt här
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

  return(
    <TypeTestWrapper>
      <Text>
        {
          wordArr.map((letter, i) => {
            return <span key={i}>{letter}</span>
          })
        }
      </Text>
      <Input />
    </TypeTestWrapper>
  );
}

export default TypeTest;