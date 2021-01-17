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

  &.first-row::before {
    position: absolute;
    left: 0;
    content: '';
    display: inline-block;
    height: 75%;
    width: 3px;
    background-color: orange;
    opacity: 0.7;
    ${props => props.caretOffset && css`
      margin-left: ${props.caretOffset}ch;`
    }
  }

  &.animate::before {
    animation: 1.8s cubic-bezier(0.78, 0.2, 0.05, 1.0) 0s infinite forwards caret-blink;
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
  let rowClasses = props.first ? 'row first-row animate' : 'row';
  return (
    <StyledRow caretOffset={props.caretOffset} className={rowClasses}>
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

  // Restart caret animation when key is pressed.
  const restartCaretAnimation = () => {
    let rowElem = document.querySelector('.first-row');
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
            // caretOffset positions caret on top.
            caretOffset={props.caretOffset}
            first={rowInd === 0}
          >
            {row.map((word, wordInd) => {
              return (
                <Word
                  key={wordInd}
                  isCurrent={rowInd === 0 && wordInd === props.currentWordInd}
                  isCorrect={rowInd === 0 && props.currentWordInd > wordInd}
                >
                  {word.map((letter, letterInd) => {
                    return (
                      <Letter
                        key={letterInd}
                        // Highlight that letter has been input
                        entered={
                          rowInd === 0 &&
                          props.inputValue.length > letterInd &&
                          wordInd === props.currentWordInd
                        }
                        // Highlights incorrectly input letter
                        isIncorrect={
                          props.currentWord[letterInd] !== props.inputValue[letterInd] && // Match letter
                          rowInd === 0 &&
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