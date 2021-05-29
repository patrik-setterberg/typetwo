import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {themeSettings} from '../../globals.js';
import themes from '../../themes.js';
import {ThemeProvider} from 'styled-components';
import TypeTestHandler from '../game/type-test-handler.js';


/**
 * TEMP / TODO:
 * 
 * Store control panel's settings somewhere. Probably in a cookie.
 * Close control panel with Escape even if game is not running (move logic from input.js because it is not mounted when score screen is displayed).
 */


const Main = styled.main`
	height: 100%;
	width: 100%;
	position: fixed;
	background-color: #29292B;
	font-family: 'Roboto Mono', monospace;
`

const App = () => {

  // Keep track of currently active theme.
  const [currentTheme, setCurrentTheme] = useState(themes[themeSettings.DEFAULT_THEME]);

  // Set active theme
  const setTheme = (theme) => {
    setCurrentTheme(themes[theme]);
    //console.log(Object.keys(themes));
  }

  // Keep track of whether document is focused.
  const [documentIsFocused, setDocumentIsFocused] = useState(document.hasFocus());

  const handleBlur = () => {
    setDocumentIsFocused(false);
  }

  const handleFocus = () => {
    setDocumentIsFocused(true);
  }

  const handleMouseDown = () => {
    document.body.classList.add('no-outline');
  }

  const [escapePressed, setEscapePressed] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      document.body.classList.remove('no-outline');
    }

    if (event.key === 'Escape') {
      setEscapePressed(true);
      setTimeout(() => {
        setEscapePressed(false);
      }, 0);
    }
  }

  useEffect(() => {
    // Handle document focus.
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    // Only show focus outline when using keyboard.
		document.body.addEventListener('mousedown', handleMouseDown);
		document.body.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.body.removeEventListener('mousedown', handleMouseDown);
      document.body.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

	return(
		<>
      <ThemeProvider theme={currentTheme}>
        <Main>
          <TypeTestHandler
            documentIsFocused={documentIsFocused}
            setTheme={setTheme}
            escapePressed={escapePressed}
          />
        </Main>
      </ThemeProvider>
		</>
	);
} 

export default App;