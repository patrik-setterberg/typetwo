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
  transition: background-color 0.07s linear, border 0.09s var(--default-timing);

  & + & {
    margin-left: 0.5ch;
  }

  ${props => props.highlightPressed && css`
    background-color: rgba(255, 255, 255, 0.4);`
  }

  ${props => props.highlightAccurate && css`
    border: 1px solid #fff;`
  }
  
  ${props => props.highlightPressedInaccurate && css`
    background-color: rgba(255, 0, 0, 0.3);
    `
  }

  ${props => props.shiftPressed && props.isShift && css`
    border: 1px solid #fff;`
  }

  ${props => props.highlightSpacePressed && css`
    border: 1px solid #fff`
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
    }

    // RIGHT SHIFT
    & > *:last-child {
      padding-left: 9.5ch;
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
  margin: 3rem auto 1rem;
  width: fit-content;
  font-size: 1.25rem;
`

const Keyboard = (props) => {
  const [currentLayout, setCurrentLayout] = useState(g.KEYBOARD_DEFAULT_LAYOUT);

  const [highlightedAccuratePressed, setHighlightedAccuratePressed] = useState([]);
  const [highlightedInaccuratePressed, setHighlightedInaccuratePressed] = useState([]);
  const [highlightedAccurate, setHighlightedAccurate] = useState([]);

  const HIGHLIGHT_DURATION = 150;

  // Add keys to highlight arrays.
  function highlightKey (stateArr, func, key) {
    func((stateArr) => stateArr.concat(key));
    setTimeout(() => {
      console.log(stateArr)
      func((stateArr) => stateArr.splice(stateArr.indexOf(key), 1));
    }, HIGHLIGHT_DURATION);
  }

  useEffect(() => {
    if (props.lastKey.length > 0) {

      // Highlight correctly input keys
      if (props.lastKey === props.correctKey) {
        highlightKey(highlightedAccuratePressed, setHighlightedAccuratePressed, props.lastKey);
      }

      // Highlight inaccurate key.
      if (props.lastKey !== props.correctKey) {
        highlightKey(highlightedInaccuratePressed, setHighlightedInaccuratePressed, props.lastKey);
      }

      // Highlight current correct key.
      highlightKey(highlightedAccurate, setHighlightedAccurate, props.correctKey ? props.correctKey : ' ');
    }

    /*
    setTimeout(() => {
      setHighlightedAccuratePressed([]);
      setHighlightedInaccuratePressed([]);
      setHighlightedAccurate([]);
    }, HIGHLIGHT_DURATION);
    */

  }, [props.typedRecently]);

  return (
    <StyledKeyboard>

      {LAYOUTS[currentLayout].map((row, rowInd) => {
        return (
          <Row
            key={rowInd}
            iso={rowInd === 2 && row.length > 12} // ANSI has 12 bottom keys
          >
            {row.map((keySymbol, keyInd) => {
              return (
                <Key
                  key={keyInd}
                  highlightPressed={highlightedAccuratePressed.indexOf(keySymbol) !== -1}
                  

                    // keySymbol === props.keyPressedRecently &&
                    //keySymbol === props.correctKey
                  
                  highlightPressedInaccurate={highlightedInaccuratePressed.indexOf(keySymbol) !== -1}
                    //keySymbol === props.keyPressedRecently &&
                    //keySymbol !== props.correctKey
                  
                  highlightAccurate={highlightedAccurate.indexOf(keySymbol) !== -1}
                    /*
                    (props.keyPressedRecently.length === 1 || props.keyPressedRecently === ' ') &&
                    keySymbol === (props.keyPressedRecently === ' ' && props.wordIncorrect === true ? props.nextKey : props.correctKey) &&
                    keySymbol !== props.keyPressedRecently &&
                    props.playing === true
                    */
                  
                  shiftPressed={props.shiftPressed}
                  isShift={rowInd === 2 && (keyInd === 0 || keyInd + 1 === row.length)}
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
          highlightSpacePressed={props.keyPressedRecently === ' '}
          highlightPressedInaccurate={
            props.keyPressedRecently === ' ' &&
            props.wordIncorrect === true && 
            props.playing === true
          }
        >
        {`\u2007`}
        </Key>
      </Row>
    </StyledKeyboard>
  );
}

export default Keyboard;