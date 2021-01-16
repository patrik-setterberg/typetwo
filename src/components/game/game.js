import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import words from '../../assets/game/words.js';
import Input from './input.js';
import Text from './text.js';

/* STYLES */
const TypeTestWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const TypeTest = () => {  

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

  // Playing state
  const [playing, setPlaying] = useState(false);

  /* Keep track of currentWord.
     Input is compared with currentWord to progress in test.
     Resets after full row has been matched. */
  const [currentWord, setCurrentWord] = useState(0);

  /* Array of rows. Each row consists of arrays of words.
     Each word is an array of letters. */
  const [textRows, setTextRows] = useState(loadRows(words));

  /* Update TextRows state.
     Remove row from front of array, load a new row and push it onto array. */
  function updateTextRows() {
    let tempArr = textRows;
    tempArr.shift();
    tempArr.push(loadRow(words));
    setTextRows(tempArr);
  }

  // Keep track of whether document (or any element inside it) is focused
  const [documentFocused, setDocumentFocus] = useState(false);

  /* Some state change needed to trigger re-render.
     Please come up with something nicer. */
  const [randomState, setRandomState] = useState(false);
  function toggleRandomState() {
    setRandomState((randomState) => !randomState);
  }

  // Compare array currentWord with str from text-input
  const checkFullWord = (currentWord, input) => {
    console.log(currentWord.join(''));
    console.log(input);
    return currentWord.join('') === input;
  }

  /* Handle currentWord.
     Increases currentWord and resets it if it reaches global WORDS_PER_ROW constant */
  const updateCurrentWord = () => {
    if (currentWord === (g.WORDS_PER_ROW - 1)) {
      updateTextRows();
    }
    setCurrentWord((currentWord) => (currentWord + 1) % g.WORDS_PER_ROW);
  }

  useEffect(() => {
    // Check page focus
    setInterval(() => {
      setDocumentFocus(document.hasFocus())}, g.FOCUS_CHECK_INTERVAL
    );

    // Start test on detecting letters being input
    const handleKeypress = (e) => {
      if (playing === false) {
        if (/[a-z|A-Z]/g.test(e.key) && e.key !== 'Enter') {
          setPlaying(true);
        }
      }
  
      // State change needed to trigger rerender :(
      toggleRandomState();
    };
    window.addEventListener('keypress', handleKeypress);

    // Keyup listener needed because 'keypress' doesn't detect Escape
    const handleKeyup = (e) => {
      if (e.key === 'Escape') {
        // Stop test and load a new set of rows of words
        setPlaying(false);
        setTextRows(loadRows(words));
        setCurrentWord(0);  
      }
    };
    window.addEventListener('keyup', handleKeyup);
    
    return () => {
      window.removeEventListener('keypress', handleKeypress);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [loadRows, playing, textRows]);

  return(
    <TypeTestWrapper focused={documentFocused}>
      <Text 
        focused={documentFocused}
        currentWord={textRows[0][currentWord]}
        currentWordInd={currentWord}
        rows={textRows}
        playing={playing}
        />
      <Input
        currentWord={textRows[0][currentWord]}
        playing={playing}
        focused={documentFocused}
        checkWord={checkFullWord}
        updateCurrentWord={updateCurrentWord}
      />
      <div>{playing ? 'playing' : 'not playing'}</div>
    </TypeTestWrapper>
  );
}

export default TypeTest;
