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

  & > div:last-of-type { // TEMP
    align-self: flex-start; // TEMP
  }  // TEMP

  @media ${g.medium} {
    width: 90vw;
  }

  @media ${g.large} {
    width: 70vw;
  }

`

const Text = styled.div`
  font-size: 1.3rem;
  color: ${props => props.focused ? '#fff' : 'transparent'};
  text-shadow: ${props => props.focused ? 'none' : '0 0 0.4rem #fff'};
  transition: color 0.225s ease, text-shadow 0.225s ease;

  & > span {
    display: inline-block;
    line-height: 1.6;
  }
`

// Retrieves a random word from imported array of words, return array of letters
const getWord = (words) => {
  return words[Math.floor(Math.random() * words.length)].split('');
}

const compareInput = (word, str) => {
  str = str.replace(/[^a-zA-Z-' ]/g, "").toLowerCase().replace(/\s+/g, " ").trim().split('');
  console.log(str);
  console.log(word);
}

const WORD_COUNT = 80;

let wordsArr = Array.from(Array(WORD_COUNT)).map((_) => {
  return getWord(words);
});

const StyledInput = styled.input`
  margin-top: 1rem;
  margin-bottom: 1rem; //temp prob
  font-family: 'Roboto Mono', monospace;
  font-size: 1.2rem;
  width: 50%;
  padding: 0.7rem 0.6rem;
  border-radius: 0.6rem;
  align-self: flex-start;
  opacity: ${props => props.focused ? '1' : '0.5'};
  transition: opacity 0.225s ease;

  &:focus {
    outline: none;
  }
`

const Input = (props) => {
  let textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
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
      onChange={(e) => {
        let value = e.target.value.replace(/[^a-zA-Z1-9-' ]/g, "").replace(/\s+/g, " ").trim();
        compareInput(wordsArr[props.currentWord], value);
        
      }}

      aria-label="Type test input"
      ref={textInput}
      onBlur={() => {
        setInterval(() => {textInput.current.focus()}, 100);
      }}
    />
  );
}

const TypeTest = () => {

  // Initialize playing state
  const [playing, setPlaying] = useState(false);

  const [currentWord, setCurrentWord] = useState(0);



  // On game end, kanske finalScore = currentWord;? Den borde hålla reda på hur många ord man skrivit

  /* Initialize state to keep track of whether document (page)
     or any element inside it is focused */
  const [documentFocused, setDocumentFocus] = useState(false);

  // Set how often component checks if document is focused
  const FOCUS_CHECK_INTERVAL = 66;

  useEffect(() => {
    // Check page focus
    setInterval(() => {
      setDocumentFocus(document.hasFocus())}, FOCUS_CHECK_INTERVAL
    );

    const handleKeyup = (event) => {

      // handle Escape
      if (event.keyCode === 27) {
    
        console.log('# TEST STOPPED #');
        setPlaying(false);
        event.target.value = '';
        
      }
    };
    window.addEventListener('keyup', handleKeyup);

    // handle other keys
    const handleKeypress = (event) => {

      setPlaying(true); // (;;  NOT GREAT 
      
    };
    window.addEventListener('keypress', handleKeypress);

    return () => {
      window.removeEventListener('keypress', handleKeypress);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, []);


  return(
    <TypeTestWrapper focused={documentFocused}>
      <Text focused={documentFocused}>
        {wordsArr.map((word, i) => {
          return(
            <span key={i}>
              {word.map((letter, j) => {
                return(
                  <span key={j}>{letter}</span>
                )})
              }&nbsp;
            </span>
          );
        })}
      </Text>
      <Input
        currentWord={currentWord}
        playing={playing}
        focused={documentFocused}
      
      />
      <div>{playing ? 'playing' : 'not playing'}</div>
    </TypeTestWrapper>
  );
}

export default TypeTest;
