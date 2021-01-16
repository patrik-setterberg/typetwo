import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
// import g from '../../globals.js';

/* STYLES */
const TextWrapper = styled.div`
  font-size: 1.3rem;
  color: ${props => props.focused ? '#fff' : 'transparent'};
  text-shadow: ${props => props.focused ? 'none' : '0 0 0.4rem #fff'};
  transition: color 0.225s ease, text-shadow 0.225s ease;

  & > span {
    line-height: 1.6;
  }
`

const StyledRow = styled.span`
  display: block;
`

const StyledWord = styled.span`
  ${props => props.isCorrect && css`
    color: #888;`
  }
`

const StyledLetter = styled.span`

`

/* COMPONENTS */
const Row = (props) => {
  return (
    <StyledRow className="row">{props.children}</StyledRow>
  );
}

const Word = (props) => {
  return (
    <StyledWord isCorrect={props.isCorrect} className="word">{props.children}</StyledWord>
  );
}

const Letter = (props) => {
  return (
    <StyledLetter className="letter">{props.children}</StyledLetter>
  );
}

/**
* Text component displays test's words on screen. Text is blurred when document loses focus.
* Uses styled component Textwrapper. Uses components Row, Word, Letter.
* Iterates through prop "rows" and prints its contents
*/
const Text = (props) => {

  const [rowArr, setRowArr] = useState(props.rows);

  useEffect(() => {
    setRowArr(props.rows);
  }, [props.rows]);

  return (
    <TextWrapper focused={props.focused}>
      {rowArr.map((row, i) => {
        return (
          <Row key={i}>
            {row.map((word, j) => {
              return (
                <Word key={j} isCorrect={props.currentWordInd > j && i === 0}>
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

// Does this work just like this?
export default React.memo(Text);