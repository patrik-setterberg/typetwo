import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import g, {LAYOUTS} from '../../globals.js';

const Key = styled.span`
  display: inline-flex;
  border: 1px solid #888;
  border-radius: 0.5rem;
  padding: 0.75ch 1.5ch;
  align-items: center;
  position: relative;
  pointer-events: none;
  transition: background-color 0.04s linear, border 0.05s linear;

  & + & {
    margin-left: 0.5ch;
  }

  ${props => props.highlightPressedAccurate && css`
    background-color: rgba(255, 255, 255, 0.4);`
  }

  ${props => props.highlightAccurate && css`
    border: 1px solid #fff;`
  }
  
  ${props => props.highlightPressedInaccurate && css`
    background-color: rgba(255, 0, 0, 0.3);`
  }

  ${props => props.highlightSpacePressed && css`
    background-color: rgba(255, 255, 255, 0.4);`
  }
`

const Row = styled.div`

  // TOP ROW
  &:nth-child(1) {
    margin-left: 7ch;
  }

  // HOME ROW
  &:nth-child(2) {
    margin-left: 8ch;
    
    & > *:nth-child(4)::after,
    & > *:nth-child(7)::after {
      content: '';
      display: block;
      position: absolute;
      width: 1ch;
      border-bottom: 2px solid darkorange;
      bottom: 0.5ch;
      opacity: 0.6;
    }
  }

  // BOTTOM ROW
  &:nth-child(3) {

    // LEFT SHIFT
    & > *:first-child {
      padding-right: ${props => props.iso ? '2.5ch' : '7.25ch'};
      ${props => props.leftShiftPressed && css`
        background-color: rgba(255, 255, 255, 0.4);`
      }
      ${props => props.leftShiftPressedInaccurate && css`
        background-color: rgba(255, 0, 0, 0.3);`
      }
      /**
       * Highlight accurate if either only one shift is pressed, if both are pressed,
       * or neither (when they should have been)...
       * Basically just don't highlight *the other* shift as accurate while, or shortly after
       * a shift key has been pressed.
       */
      ${props => props.shiftAccurate &&
        ((props.leftShiftPressed && !props.rightShiftPressed) ||
        (props.leftShiftPressed && props.rightShiftPressed) ||
        (!props.leftShiftPressed && !props.rightShiftPressed && !props.shiftPressedRecently)) && css`
        border: 1px solid #fff;`
      }
    }

    // RIGHT SHIFT
    & > *:last-child {
      padding-left: 9.5ch;
      ${props => props.rightShiftPressed && css`
        background-color: rgba(255, 255, 255, 0.4);`
      }
      ${props => props.rightShiftPressedInaccurate && css`
        background-color: rgba(255, 0, 0, 0.3);`
      }
      ${props => props.shiftAccurate && ((props.rightShiftPressed && !props.leftShiftPressed) ||
      (props.leftShiftPressed && props.rightShiftPressed) ||
      (!props.leftShiftPressed && !props.rightShiftPressed && !props.shiftPressedRecently)) && css`
        border: 1px solid #fff;`
      }
    }
  }

  // SPACE
  &:nth-child(4) > *:first-child {
    padding-left: 14ch;
    padding-right: 14ch;
    margin-left: 16.5ch;
  }

  & + & {
    margin-top: 0.5ch;
  }
`

const StyledKeyboard = styled.div`
  display: ${props => props.keyboardVisible ? 'block' : 'none'};
  margin: 3rem auto 1rem;
  width: fit-content;
  font-size: 1.25rem;
  opacity: 0;
  max-height: 0px;
  transition: opacity 0.1s var(--default-timing), max-height 0.2s var(--default-timing) 0.2s;

  @media ${g.large} {
    opacity: 1;
    max-height: 300px;
    transition: opacity 0.1s var(--default-timing), max-height 0.05s var(--default-timing);
  }
`

const Keyboard = (props) => {

  // Arrays for storing currently highlighted keys.
  const [highlightedAccuratePressed, setHighlightedAccuratePressed] = useState([]);
  const [highlightedInaccuratePressed, setHighlightedInaccuratePressed] = useState([]);
  const [highlightedAccurate, setHighlightedAccurate] = useState([]);

  /**
   * Check if previously typed letter was the last of current word...
   * Used for highlighting space as accurate key at the end of word.
   * Is needed because otherwise last letter of the word is highlighted instead.
   */
  const [wasEndOfWord, setWasEndOfWord] = useState(false);

  useEffect(() => {
    if (props.endOfWord === true) {
      setWasEndOfWord(true);
    } else {
      setWasEndOfWord(false);
    }
  }, [props.typedRecently]);

  useEffect(() => {
    if (props.lastKey.length > 0 && props.typedRecently === true && props.lastKey !== 'Backspace') {
      // Highlight correctly input keys
      if (props.lastKey === props.correctKey && !props.spacePressedRecently) {
        setHighlightedAccuratePressed((highlightedAccuratePressed) => highlightedAccuratePressed.concat(props.lastKey.toLowerCase()));
      }
      // Highlight inaccurate key.
      if (props.lastKey !== props.correctKey  && !props.spacePressedRecently) {
        setHighlightedInaccuratePressed((highlightedInaccuratePressed) => highlightedInaccuratePressed.concat(props.lastKey.toLowerCase()));
      }
      // Highlight current correct key.
      if (props.correctKey !== undefined && props.nextKey !== undefined) {
        setHighlightedAccurate((highlightedAccurate) => (
          (props.spacePressedRecently || (wasEndOfWord === true && props.inputLength > 0)) &&
          (props.endOfWord === true || props.wordIncorrect === true) ?
            highlightedAccurate.concat(props.nextKey.toLowerCase()) : highlightedAccurate.concat(props.correctKey.toLowerCase())
        ));
      }
    }
  }, [props.typedRecently]);

  // Timers for removing keys from highlight-arrays.
  useEffect(() => {
    if (highlightedAccuratePressed.length > 0 && props.typedRecently === true) {
      setTimeout(() => {
        setHighlightedAccuratePressed((highlightedAccuratePressed) => (highlightedAccuratePressed.slice(1)));
      }, g.KEYBOARD_HIGHLIGHT_DURATION);
    }
  }, [highlightedAccuratePressed]);

  useEffect(() => {
    if (highlightedInaccuratePressed.length > 0 && props.typedRecently === true) {
      setTimeout(() => {
        setHighlightedInaccuratePressed((highlightedInaccuratePressed) => (highlightedInaccuratePressed.slice(1)));
      }, g.KEYBOARD_HIGHLIGHT_DURATION);
    }
  }, [highlightedInaccuratePressed]);

  useEffect(() => {
    if (highlightedAccurate.length > 0 && props.typedRecently === true) {
      setTimeout(() => {
        setHighlightedAccurate((highlightedAccurate) => (highlightedAccurate.slice(1)));
      }, g.KEYBOARD_HIGHLIGHT_DURATION);
    }
  }, [highlightedAccurate]);

  return (
    <StyledKeyboard keyboardVisible={props.keyboardVisible}>
      {LAYOUTS[props.currentLayout].map((row, rowInd) => {
        return (
          <Row
            key={rowInd}
            iso={rowInd === 2 && row.length > 12} // ANSI has 12 bottom keys
            lastKey={props.lastKey}
            shiftPressedRecently={props.shiftPressedRecently}
            leftShiftPressed={props.leftShiftPressed}
            leftShiftPressedInaccurate={
              rowInd === 2 &&
              props.correctKey !== undefined &&
              props.leftShiftPressed && highlightedInaccuratePressed.length > 0 &&
              props.correctKey !== props.correctKey.toUpperCase()
            }
            rightShiftPressed={props.rightShiftPressed}
            rightShiftPressedInaccurate={
              rowInd === 2 &&
              props.correctKey !== undefined &&
              props.rightShiftPressed && highlightedInaccuratePressed.length > 0 &&
              props.correctKey !== props.correctKey.toUpperCase()
            }
            shiftAccurate={
              // Highlight shift as accurate if it was correctly input, but also if it should have been and wasn't.
              rowInd === 2 &&
              (((props.correctKey !== undefined && props.correctKey === props.correctKey.toUpperCase()) && (highlightedAccurate.length > 0 && !props.spacePressedRecently)) ||
-              (props.spacePressedRecently === true && props.wordIncorrect === true && !props.endOfWord && props.nextKey === props.nextKey.toUpperCase()))
            }
          >
            {row.map((keySymbol, keyInd) => {
              return (
                <Key
                  key={keyInd}
                  highlightPressedAccurate={highlightedAccuratePressed.indexOf(keySymbol) !== -1}
                  highlightPressedInaccurate={highlightedInaccuratePressed.indexOf(keySymbol) !== -1}
                  highlightAccurate={
                    (highlightedAccurate.indexOf(keySymbol) !== -1 && props.lastKey.length === 1) ||
                    (props.spacePressedRecently === true && props.wordIncorrect === true && props.nextKey.toLowerCase() === keySymbol)
                  }
                >
                  {keySymbol.toUpperCase()}
                </Key>
              );
            })}
          </Row>
        );
      })}
      <Row>
        <Key
          highlightSpacePressed={
            (props.spacePressedRecently === true || highlightedAccurate.indexOf(' ') !== -1) &&
            props.endOfWord === false &&
            props.wordIncorrect === false &&
            props.playing === true
          }
          highlightAccurate={highlightedAccurate.indexOf(' ') !== -1}
          highlightPressedInaccurate={
            props.spacePressedRecently === true &&
            props.wordIncorrect === true
          }
        >
        {`\u2007`}{/* A good looking whitespace character. */}
        </Key>
      </Row>
    </StyledKeyboard>
  );
}

export default Keyboard;