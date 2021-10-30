import React from 'react';
import styled, {css} from 'styled-components';
import g from '../../globals.js';

const InstructionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`

const StyledInstructions = styled.span`
  opacity: 1;
  color: ${props => props.theme.highlight};
  font-size: 1.125rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  transition: color 0.2s var(--default-timing);
  ${props => props.playing && props.focused && !props.controlPanelOpen && css`
    transition: opacity 1s var(--default-timing) 1s, color 1.5s linear;
    opacity: 0;`
  }

  @media ${g.atleastMedium} {
    width: max-content;
  }
`

const TestInstructions = (props) => {
  return (
    <InstructionsContainer>
      <StyledInstructions
        playing={props.playing}
        focused={props.focused}
        controlPanelOpen={props.controlPanelOpen}
      >
        {props.focused ?
          (props.playing ?
            (props.controlPanelOpen ? 'Close control panel to unpause' : 'Type like the wind') :
            (props.controlPanelOpen ? 'Close control panel to return to test' :
              (props.testConcluded ? 'Press ENTER to run test again' : 'Begin typing to start test')
            )
          )
          : (props.playing ?
            (props.controlPanelOpen ? 'Close control panel to unpause' : 'Focus lost. Click page to resume') :
            (props.controlPanelOpen ? 'Close control panel to return to test' : 'Click page to focus')
          )
        }
      </StyledInstructions>
    </InstructionsContainer>
  );
}

export default TestInstructions;



