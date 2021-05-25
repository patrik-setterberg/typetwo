/**
 * TYPE TEST TEXT COMPONENT
 * Displays type test's words on screen.
 * Incorrectly input characters are highlighted in **PROBABLY RED**.
 */

import React, {useEffect, useState, useRef} from 'react';
import styled, {css} from 'styled-components';
import g from '../../globals.js';
import {debounce} from '../../utilities.js';

const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  color: ${(props => props.focused) ? '#fff' : 'transparent'};
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
  transition: color 0.03s var(--default-timing), text-shadow 0.2s ease;

  ${props => props.entered === false && props.wordIsCorrect === false && props.focused === false && css`
    text-shadow: 0 0 0.4rem #fff;`
  }

  ${props => props.entered && css`
    color: #888; /* Use a variable */`
  }

  ${props => props.isIncorrect && css`
    color: darkred;`
  }

  ${props => props.wordIncorrect && props.entered === false && props.playing && css`
    text-decoration: underline;`
  }

  ${props => props.focused === false && css`
    color: transparent;
    transition: color 0.2s var(--default-timing), text-shadow 0.2s var(--default-timing);`
  }

  ${props => props.focused === false && props.entered && css`
    text-shadow: 0 0 0.4rem #666;`
  }

  ${props => props.focused === false && props.wordIsCorrect && css`
    text-shadow: 0 0 0.4rem #666;`
  }

  ${props => props.isIncorrect && props.focused === false && css`
    text-shadow: 0 0 0.4rem darkred;`
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
  opacity: var(--caret-opacity);
  position: absolute;
  z-index: 1;
  visibility: ${props => props.focused ? 'visible' : 'hidden'};
  left: ${props => props.currentWordLeft}px;
  top: ${props => props.currentWordTop}px;

  ${props => props.playing === true && props.focused === false && css`
    opacity: 0;`
  }

  ${props => props.focused && !props.typedRecently && css`
    animation: 1.3s cubic-bezier(0.78, 0.2, 0.05, 1.0) 0s infinite forwards caret-blink;
  `}
`;

const Wrapper = (props) => {
  return (
    <TextWrapper
      focused={props.focused}
      controlPanelOpen={props.controlPanelOpen}
    >
      {props.children}
    </TextWrapper>
  );
}

const Caret = (props) => {
  return (
    <StyledCaret
      {...props}
    />
  );
}

const Word = ({wordsRef, children, ...rest}) => {
  return (
    <StyledWord
      ref={wordsRef}
      {...rest}
    >
      {children}
    </StyledWord>
  );
}

const Letter = (props) => {
  return (
    <StyledLetter
      {...props}
    >
      {props.children}
    </StyledLetter>
  );
}

/**
* Text component displays test's words on screen. Text is blurred when document loses focus.
* Uses styled component Textwrapper. Uses components Word, Letter, Caret.
* Iterates through an array of words and prints its contents.
*/
const Text = (props) => {

  const wordsRef = useRef([]);

  useEffect(() => {
    // Update words' refs when words array changes.
    wordsRef.current = wordsRef.current.slice(0, props.testWords.length);
  }, [props.testWords]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setWindowWidth(window.innerWidth);
    }, g.RESIZE_CHECK_INTERVAL);
    window.addEventListener('resize', debouncedHandleResize);

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize);
    }
  }, []);

  // Keep track of current word's position for caret positioning and rows handling.
  const [currentWordLeft, setCurrentWordLeft] = useState(0);
  const [currentWordTop, setCurrentWordTop] = useState(0);

  useEffect(() => {
    setCurrentWordLeft(wordsRef.current[props.currentWordInd].offsetLeft);
    setCurrentWordTop(wordsRef.current[props.currentWordInd].offsetTop);
  }, [props.currentWordInd, windowWidth]);

  /**
   * Compare current word's offsetTop with previous word's, to detect if current word just
   * jumped to third or higher row. If true, it initiates removing and adding new words.
   */
  useEffect(() => {
    if (props.currentWordInd > 0) {
      let prevElem = wordsRef.current[props.currentWordInd].previousElementSibling;
      let smallestOffsetTop = prevElem.offsetTop;

      if (wordsRef.current[props.currentWordInd].offsetTop > smallestOffsetTop && smallestOffsetTop > 0) {
        let removeWordsCount = 0;
        while (prevElem) {
          if (prevElem.offsetTop < smallestOffsetTop) removeWordsCount += 1;
          prevElem = prevElem.previousElementSibling;
        }
        props.setWordShiftCount(removeWordsCount);
      }
    }
  }, [props.currentWordInd]);

  // Restart caret animation when focus is regained.  
  useEffect(() => {
    if (props.focused === true) props.updateTypedRecently();
  },[props.focused]);

  return (
    <Wrapper focused={props.focused && !props.controlPanelOpen}>

      {props.testWords.map((word, wordInd) => {
        return (
          <Word
            key={wordInd}
            wordsRef={elem => wordsRef.current[wordInd] = elem}
            isCurrent={wordInd === props.currentWordInd}
            isCorrect={props.currentWordInd > wordInd}
          >
            {word.map((letter, letterInd) => {
              return (
                <Letter
                  playing={props.playing}
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
                  wordIncorrect={props.wordIncorrect && props.currentWordInd === wordInd}
                  focused={props.focused && !props.controlPanelOpen}
                  wordIsCorrect={props.currentWordInd > wordInd}
                >
                  {letter}
                </Letter>
              );
            })}
          </Word>
        );
      })}
      <Caret
        playing={props.playing}
        focused={props.focused && !props.controlPanelOpen}
        currentWordLeft={currentWordLeft}
        currentWordTop={currentWordTop}
        inputValue={props.inputValue}
        caretPosition={props.caretPosition}
        typedRecently={props.typedRecently}
        style={{
          transform: `translateX(min(${props.caretPosition}ch, ${props.inputValue.length}ch))`,
        }}
      />
    </Wrapper>
  );
}

// Does this work just like this?
export default React.memo(Text);