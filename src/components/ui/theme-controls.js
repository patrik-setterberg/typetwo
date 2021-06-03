import React from 'react';
import styled, {css} from 'styled-components';
import themes from '../../themes.js';

const ThemeControlsContainer = styled.div`

  & span {
    display: block;
    text-transform: uppercase;
    text-align: center;
    font-weight: 600;
    letter-spacing: 1px;
  }

  & div {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
  }
`

const StyledThemeButton = styled.button`
  background: ${props => themes[props.themeOption].backgroundPrimary};
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;

  & + & {
    margin-left: 0.8rem;
  }

  ${props => props.isCurrent && css`
    border: 2px solid ${props => props.theme.highlight};`
  }
`
const ThemeButton = (props) => {

  const handleClick = () => {
    props.setTheme(props.themeOption);
  }

  return (
    <StyledThemeButton
      onClick={handleClick}
      isCurrent={props.isCurrent}
      themeOption={props.themeOption}
    >
      {props.children}
    </StyledThemeButton>
  );
}

const ThemeControls = (props) => {

  const themeNames = Object.keys(themes);

  return (
    <ThemeControlsContainer>
      <span>Select theme</span>
      <div>
        {themeNames.map((theme) => {
          return (
            <ThemeButton
              key={theme}
              themeOption={theme}
              setTheme={props.setTheme}
              isCurrent={themes[theme] === props.currentTheme}
            />
          );
        })}
      </div>
    </ThemeControlsContainer>
  );
}

export default ThemeControls;