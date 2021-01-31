import React from 'react';
import styled, {css} from 'styled-components';

const InstructionsContainer = styled.div`
  min-height: 50px;
  display: flex;
  justify-content: center;
`

const StyledInstructions = styled.span`
  opacity: 1;
  ${props => props.playing === true && props.focused === true && css`
    transition: opacity 1s var(--default-timing) 1s, color 1.5s linear;
    font-size: 1.3rem;
    opacity: 0;
    color: #888;`
  }
`

const TestInstructions = (props) => {
  return (
    <InstructionsContainer>
      <StyledInstructions playing={props.playing} focused={props.focused}>
        {props.focused ?
          (props.playing ? 'Type like the wind' : 'Begin typing to start test') :
          (props.playing ? 'Test paused, focus to resume' : 'Click document to focus')
        }
      </StyledInstructions>
    </InstructionsContainer>
  );
}

export default TestInstructions;



