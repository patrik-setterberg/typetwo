import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import words from '../../assets/game/words.js';

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

const StyledRow = styled.span`
  display: block;
`

const Row = (props) => {

  return (
    <StyledRow className="row">
      {props.children}
    </StyledRow>
  );
}

const StyledWord = styled.span`

`

const Word = (props) => {

  return (
    <StyledWord className="word">
      {props.children}
    </StyledWord>
  );
}

const StyledLetter = styled.span`

`

const Letter = (props) => {

  return (
    <StyledLetter className="letter">
      {props.children}
    </StyledLetter>
  );
}


// Retrieves a random word from array of words, return array of letters
const getWord = (words) => {
  return words[Math.floor(Math.random() * words.length)].split('');
}

const compareInput = (word, inputStr) => {
  let inputArr = inputStr.trim().split('');

  // ehhhhhhh
  console.log(`input is ${inputArr.toString()}`);
  console.log(`currentWord is ${word.toString()}`);
}

const StyledInput = styled.input`
  margin-top: 1rem;
  margin-bottom: 1rem; //temp prob
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
  let textInput = useRef(null);
  let focusTimer = null;
  useEffect(() => {
    textInput.current.focus();
  });

  function focusInput(elem) {
    elem.current.focus();
    console.log('focusn');
  }


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
        // filter input
        let value = e.target.value.replace(/[^a-zA-Z0-9-.,'!? ]/g, "").replace(/\s+/g, " ");
        e.target.value = value;

        // do processing
        compareInput(props.currentWord, value);
      }}

      aria-label="Type test input"
      ref={textInput}
      onBlur={() => {
        if (props.playing === true) {
          focusTimer = window.setInterval(focusInput(textInput), 100);
        }
      }}
      onFocus={() => {
        window.clearInterval(focusTimer);
      }}
    />
  );
}

let usedWords = [];

const ROW_COUNT = 5;
const WORDS_PER_ROW = 8;

const loadRow = (wordArr) => {

  let rowArr = [];

  while (rowArr.length < WORDS_PER_ROW) {
    let word = getWord(wordArr);
    if (!usedWords.includes(word)) {
      rowArr.push(word);
      usedWords.push(word);
    }
  }

  return rowArr;
}

const loadRows = (wordArr) => {
  return Array.from(Array(ROW_COUNT)).map((_) => {
    return loadRow(wordArr);
  });
}

const TextWrapper = styled.div`
  font-size: 1.3rem;
  color: ${props => props.focused ? '#fff' : 'transparent'};
  text-shadow: ${props => props.focused ? 'none' : '0 0 0.4rem #fff'};
  transition: color 0.225s ease, text-shadow 0.225s ease;

  & > span {
    line-height: 1.6;
  }
`

/**
 * Text component displays test's words on screen. Text is blurred when document loses focus.
 * Uses styled component Textwrapper. Uses components Row, Word, Letter.
 * Iterates through prop "rows" and prints its contents
 */
const Text = (props) => {

const [rowArr, setRowArr] = useState(props.rows);

  useEffect(() => {
    const anotherHandleKeypress = (event) => {
      
      if (event.keyCode === 13) {

        console.log(props.rows[0][0]);

        props.myFunc();
        setRowArr(props.rows);

        console.log(props.rows[0][0]);
      }
    };
    window.addEventListener('keypress', anotherHandleKeypress);

    return () => {
      window.removeEventListener('keypress', anotherHandleKeypress);
    }

  }, [rowArr]);


  return (
    <TextWrapper focused={props.focused}>
      {rowArr.map((row, i) => {
        return (
          <Row key={i}>
            {row.map((word, j) => {
              return (
                <Word key={j}>
                  {word.map((letter, k) => {
                    return (
                      <Letter key={k}>{letter}</Letter>
                    );
                  })}
                &nbsp;</Word>
              );
            })}
          </Row>
        );
      })}
    </TextWrapper>        
  );
}

let rowsArr = loadRows(words);

const TypeTest = () => {

  

  // Initialize playing state
  const [playing, setPlaying] = useState(0);

  const stopPlaying = () => {setPlaying(0)};
  const startPlaying = () => {setPlaying(1)};

  const [currentWord, setCurrentWord] = useState(0);

  const [rowsArrState, setRowsArrState] = useState(rowsArr);

  function shiftAndPush() {
    let tempArr = rowsArrState;
    tempArr.shift();
    tempArr.push(loadRow(words));
    setRowsArrState(tempArr);
  }

  /* Initialize state to keep track of whether document (page)
     or any element inside it is focused */
  const [documentFocused, setDocumentFocus] = useState(false);


  // This is what actually made it work, somehow
  const [randomState, setRandomState] = useState(false);

  function toggleRandomState() {
    setRandomState((randomState) => !randomState);
  }

  // Set how often component checks if document is focused
  const FOCUS_CHECK_INTERVAL = 66;

  useEffect(() => {
    // Check page focus
    setInterval(() => {
      setDocumentFocus(document.hasFocus())}, FOCUS_CHECK_INTERVAL
    );

    const handleKeyup = (event) => {

      // handle Escape
      if (event.key === 'Escape') {

          stopPlaying();
         
          // console.log('# TEST STOPPED #'); // remove probably

          // Stop test, clear input and load a new set of words);
          
        
        event.target.value = '';
      }
    };
    window.addEventListener('keyup', handleKeyup);

    // handle other keys
    const handleKeypress = (event) => {

      // handle spacebar: check input  
      if (event.keyCode === 32) {
        if (playing === true && document.hasFocus()) {
          // not sure
        }
        console.log('space');
      }

    
      console.log(`playing is ${playing}`);
      
      if (playing === 0) {
        if (/[a-z]/i.test(event.key)) {
          console.log('START PLAYING');
          startPlaying();
        }
      }
  
      // This is what actually made it work, somehow
      toggleRandomState();

    };
    window.addEventListener('keypress', handleKeypress);

    return () => {
      window.removeEventListener('keypress', handleKeypress);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, []);




  return(
    <TypeTestWrapper focused={documentFocused}>
      <Text 
        focused={documentFocused}
        currentWord={rowsArr[0][currentWord]}
        rows={rowsArrState}
        myFunc={shiftAndPush}
        />
      <Input
        currentWord={rowsArr[0][currentWord]}
        playing={playing}
        focused={documentFocused}  
      />
      <div>{playing ? 'playing' : 'not playing'}</div>
    </TypeTestWrapper>
  );
}

export default TypeTest;
