/**
 * TYPE TEST TEXT COMPONENT
 * Displays type test's words on screen.
 * Incorrectly input characters are highlighted in **PROBABLY RED**.
 */

import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
// import g from '../../globals.js';


/*
const StyledRow = styled.span`
  display: flex;
  position: relative;
  align-items: center;
  font-size: 1.5rem;
*/
  /**
   * Blinking caret
   * Absolutely positioned on current row, offset from left edge set by adding length
   * of completed words on row and current length of input. Offset uses margin-left and the ch unit:
   * (width of character '0' in current font, works because we're using monospace font).
   
  &.first-row::before,
  &.second-row::before {
    position: absolute;
    left: 0;
    content: '';
    height: 75%;
    width: 3px;
    background-color: darkorange;
    opacity: 0.7;
    visibility: ${props => props.focused ? 'visible' : 'hidden'};

    ${props => props.caretOffset && css`
      margin-left: ${props.caretOffset}ch;`
    }

    ${props => props.wordIncorrect && css`
      background-color: red;`
    }
  }

  &.first-row::before {
    display: ${props => props.currentRow === 0 ? 'inline-block' : 'none'};
  }

  &.second-row::before {
    display: ${props => props.currentRow === 1 ? 'inline-block' : 'none'};
  }

  &.animate::before {
    animation: 1.3s cubic-bezier(0.78, 0.2, 0.05, 1.0) 0s infinite forwards caret-blink;
  }

  &.first-row {
    ${props => props.currentRow === 1 && css`
      color: #888;`
    }
  }
`
*/

const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  color: ${props => props.focused ? '#fff' : 'transparent'};
  transition: color 0.2s ease;
  position: relative;

  & > span {
    line-height: 1.6;
  }
`;

const StyledWord = styled.span`
  display: inline-flex;
  margin-right: 1ch;

  ${props => props.isCorrect && css`
    color: #888; /* Use a variable */`
  }
`;

const StyledLetter = styled.span`
  transition: color 0.03s var(--default-timing), text-shadow 0.2s ease;;
  text-shadow: ${props => props.focused ? 'none' : '0 0 0.4rem #fff'};

  ${props => props.entered && css`
    color: #888; /* Use a variable */`
  }

  ${props => props.isIncorrect && css`
    color: darkred;`
  }

  ${props => props.isIncorrect && props.focused === false && css`
    text-shadow: 0 0 0.4rem darkred;`
  }

  ${props => props.wordIncorrect && css`
    text-decoration: underline;`
  }

  ${props => props.focused === false && css`
    color: transparent;`
  }

  /**
   * wordIncorrect is triggered quickly when an input word is checked and is incorrect.
   * This then highlights incorrect characters.
   */
  ${props => props.wordIncorrect && props.isIncorrect && css`
    color: red;`
  }
`;

const StyledCaret = styled.div`
  height: calc(1.6 * 1.5rem); /* 1.6 is line height of text */
  font-size: 1.5rem;
  width: 3px;
  background-color: orange;
  opacity: 0.7;
  position: absolute;
  z-index: 1;
  left: ${props => props.currentWordLeft}px;
  top: ${props => props.currentWordTop}px;
  transform: translateX(${props => props.caretPosition}ch);
`;

const Caret = (props) => {
  return (
    <StyledCaret {...props} />
  );
}

/*
const Row = (props) => {
  // Row classes for caret positioning and animation.
  const rowClasses = [
    'first-row animate',
    'second-row animate',
    '',
  ];

  return (
    <StyledRow
      caretOffset={props.caretOffset}
      className={rowClasses[props.ind]}
      currentRow={props.currentRow}
      focused={props.focused}
      wordIncorrect={props.wordIncorrect}
    >
      {props.children}
    </StyledRow>
  );
}
*/
const Word = (props) => {
  return (
    <StyledWord
      isCorrect={props.isCorrect}
      className={props.isCurrent === true ? 'current' : ''}
    >
      {props.children}
    </StyledWord>
  );
}

const Letter = (props) => {
  return (
    <StyledLetter
      entered={props.entered}
      isIncorrect={props.isIncorrect}
      focused={props.focused}
      wordIncorrect={props.wordIncorrect}
      className="letter"
    >
      {props.children}
    </StyledLetter>
  );
}

/**
* Text component displays test's words on screen. Text is blurred when document loses focus.
* Uses styled component Textwrapper. Uses components Row, Word, Letter.
* Iterates through prop "rows" and prints its contents.
*/
const Text = (props) => {

  
const [currentWordLeft, setCurrentWordLeft] = useState(0);
const [currentWordTop, setCurrentWordTop] = useState(0);


useEffect(() => {

  let currentWordElem = document.querySelector('.current');

  setCurrentWordLeft(currentWordElem.offsetLeft);
  setCurrentWordTop(currentWordElem.offsetTop);

}, [props.currentWordInd]);

/*
  const [rowArr, setRowArr] = useState(props.rows);

  const rowsToHightlight = useMemo(() => {
    return([
      '.first-row',
      '.second-row',
    ])}, []);
*/

/*
  // Restart caret animation when key is pressed.
  const restartCaretAnimation = useCallback (() => {
    let rowElem = document.querySelector(rowsToHightlight[props.currentRow]); // Rows-shit here
    rowElem.classList.remove('animate');
    // Trigger reflow to allow animation to restart.
    void rowElem.offsetHeight;
    rowElem.classList.add('animate');
  }, [rowsToHightlight, props.currentRow]);

  useEffect(() => {
    setRowArr(props.rows);
  }, [props.rows]);

  useEffect(() => {
    const handleKeypress = () => {
      restartCaretAnimation();
    };
    window.addEventListener('keypress', handleKeypress);

    // Separate Keyup listener because keypress doesn't detect backspace.
    const handleKeyup = (e) => {
      if (e.key === 'Backspace') {
        restartCaretAnimation();
      }
    };
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keypress', handleKeypress);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [props.inputValue, restartCaretAnimation]);

  // Restart caret animation when focus is regained.  
  useEffect(() => {
    restartCaretAnimation();
  },[restartCaretAnimation, props.focused]);
*/
  return (
    <TextWrapper focused={props.focused}>

      {props.testWords.map((word, wordInd) => {
        return (
          <Word
            key={wordInd}
            isCurrent={wordInd === props.currentWordInd}
            isCorrect={props.currentWordInd > wordInd}
          >
            {word.map((letter, letterInd) => {
              return (
                <Letter
                  key={letterInd}
                  // Highlight that letter has been input
                  entered={
                    props.inputValue.length > letterInd &&
                    wordInd === props.currentWordInd
                  }
                  // Highlights incorrectly input letter
                  isIncorrect={
                    props.currentWord[letterInd] !== props.inputValue[letterInd] && // Match letter
                    wordInd === props.currentWordInd && // Check only currentWord
                    props.inputValue.length > letterInd // Don't check letters not yet input
                  }
                  wordIncorrect={props.wordIncorrect && props.currentWordInd === wordInd && letterInd >= props.inputValue.length }
                  focused={props.focused}
                >
                  {letter}
                </Letter>
              );
            })}
          </Word>
        );
      })}
      <Caret currentWordLeft={currentWordLeft} currentWordTop={currentWordTop} inputValue={props.inputValue} caretPosition={props.caretPosition} />
    </TextWrapper>        
  );
}

// Does this work just like this?
export default React.memo(Text);