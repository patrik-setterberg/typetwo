import React from 'react';
import styled, {css} from 'styled-components';

const InstructionsContainer = styled.div`
  min-height: 50px;
  display: flex;
  justify-content: center;
`

const StyledInstructions = styled.span`
  opacity: 1;
  color: ${props => props.theme.highlight};
  transition: color 0.2s var(--default-timing);
  ${props => props.playing && props.focused && !props.controlPanelOpen && css`
    transition: opacity 1s var(--default-timing) 1s, color 1.5s linear;
    font-size: 1.3rem;
    opacity: 0;`
  }
`

const TestInstructions = (props) => {
  return (
    <InstructionsContainer>
      <StyledInstructions playing={props.playing} focused={props.focused} controlPanelOpen={props.controlPanelOpen}>
        {props.focused ?
          (props.playing ?
            (props.controlPanelOpen ? 'Test paused. Close control panel to resume' : 'Type like the wind') :
            (props.controlPanelOpen ? 'Close control panel to return to test' : 'Begin typing to start test')
          )
          : (props.playing ?
            (props.controlPanelOpen ? 'Test paused. Close control panel to resume' : 'Focus lost. Click page to resume') :
            (props.controlPanelOpen ? 'Close control panel to return to test' : 'Click page to focus')
          )
        }
      </StyledInstructions>
    </InstructionsContainer>
  );
}

export default TestInstructions;



