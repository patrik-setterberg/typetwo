/**
 * TYPE TEST TEXT COMPONENT
 * Displays type test's words on screen.
 * Incorrectly input characters are highlighted in **PROBABLY RED**.
 */

import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
// import g from '../../globals.js';

const TextWrapper = styled.div`
  color: ${props => props.focused ? '#fff' : 'transparent'};
  text-shadow: ${props => props.focused ? 'none' : '0 0 0.4rem #fff'};
  transition: color 0.225s ease, text-shadow 0.225s ease;

  & > span {
    line-height: 1.6;
  }
`

const StyledRow = styled.span`
  display: flex;
  position: relative;
  align-items: center;
  font-size: 1.5rem;

  /**
   * Blinking caret
   * Absolutely positioned on current row, offset from left edge set by adding length
   * of completed words on row and current length of input. Offset uses margin-left and the ch unit:
   * (width of char '0' in current font, works because we're using monospace font).
   */
  &.first-row::before,
  &.second-row::before {
    position: absolute;
    left: 0;
    content: '';
    height: 75%;
    width: 3px;
    background-color: orange;
    opacity: 0.7;
    ${props => props.caretOffset && css`
      margin-left: ${props.caretOffset}ch;`
    }
  }

  &.first-row::before {
    display: ${props => props.currentRow === 0 ? 'inline-block' : 'none'};
  }

  &.second-row::before {
    display: ${props => props.currentRow === 1 ? 'inline-block' : 'none'};
  }

  &.animate::before {
    animation: 1.8s cubic-bezier(0.78, 0.2, 0.05, 1.0) 0s infinite forwards caret-blink;
  }

  &.first-row {
    ${props => props.currentRow === 1 && css`
      color: #888;`
    }
  }
`

const StyledWord = styled.span`
  ${props => props.isCurrent && css`
    `
  }

  ${props => props.isCorrect && css`
    color: #888; /* Use a variable */`
  }
`

const StyledLetter = styled.span`
  ${props => props.entered && css`
    color: #888; /* Use a variable */`
  }

  ${props => props.isIncorrect && css`
    color: red;`
  }
`

const Row = (props) => {
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
    >
      {props.children}
    </StyledRow>
  );
}

const Word = (props) => {
  return (
    <StyledWord isCurrent={props.isCurrent} isCorrect={props.isCorrect} className="word">
      {props.children}
    </StyledWord>
  );
}

const Letter = (props) => {
  return (
    <StyledLetter entered={props.entered} isIncorrect={props.isIncorrect} className="letter">
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

  const [rowArr, setRowArr] = useState(props.rows);

  const rowsToHightlight = ['.first-row', '.second-row'];

  // Restart caret animation when key is pressed.
  const restartCaretAnimation = () => {
    let rowElem = document.querySelector(rowsToHightlight[props.currentRow]);
    rowElem.classList.remove('animate');
    // Trigger reflow to allow animation to restart.
    void rowElem.offsetHeight;
    rowElem.classList.add('animate');
  }

  useEffect(() => {
    setRowArr(props.rows);

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
  }, [props.rows, props.inputValue]);

  return (
    <TextWrapper focused={props.focused}>
      {rowArr.map((row, rowInd) => {
        return (
          <Row
            key={rowInd}
            ind={rowInd}
            caretOffset={props.caretOffset}
            currentRow={props.currentRow}
          >
            {row.map((word, wordInd) => {
              return (
                <Word
                  key={wordInd}
                  isCurrent={rowInd === props.currentRow && wordInd === props.currentWordInd}
                  isCorrect={rowInd === props.currentRow && props.currentWordInd > wordInd}
                >
                  {word.map((letter, letterInd) => {
                    return (
                      <Letter
                        key={letterInd}
                        // Highlight that letter has been input
                        entered={
                          rowInd === props.currentRow &&
                          props.inputValue.length > letterInd &&
                          wordInd === props.currentWordInd
                        }
                        // Highlights incorrectly input letter
                        isIncorrect={
                          props.currentWord[letterInd] !== props.inputValue[letterInd] && // Match letter
                          rowInd === props.currentRow &&
                          wordInd === props.currentWordInd && // Check only currentWord
                          props.inputValue.length > letterInd // Don't check letters not yet input
                        }
                      >
                        {letter}
                      </Letter>
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

// Does this work just like this?
export default React.memo(Text);