import React, {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import g, {themeSettings, LAYOUTS} from '../../globals.js';
import themes from '../../themes.js';
import {ThemeProvider} from 'styled-components';
import TypeTestHandler from '../game/type-test-handler.js';

/**
 * TEMP / TODO:
 * 
 * Store control panel's settings somewhere. Probably in a cookie.
 */


const Main = styled.main`
	height: 100%;
	width: 100%;
	position: fixed;
	background-color: #262628;
	font-family: var(--font-main);
`

const App = () => {

  // Keep track of currently active theme.
  const [currentTheme, setCurrentTheme] = useState(themes[themeSettings.DEFAULT_THEME]);

  // Set active theme
  const setTheme = (theme) => {
    setCurrentTheme(themes[theme]);
    //console.log(Object.keys(themes));
  }

  const [currentLayout, setCurrentLayout] = useState(g.KEYBOARD_DEFAULT_LAYOUT);

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

  const [hotkeyPressed, setHotkeyPressed] = useState('');

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Tab') {
      document.body.classList.remove('no-outline');
    }

    if (event.key === 'Escape' || event.key === LAYOUTS[currentLayout].CONTROL_PANEL_HOTKEY) {
      setHotkeyPressed(event.key);
      setTimeout(() => {
        setHotkeyPressed('');
      }, 0);
    }
  },[currentLayout]);

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
  }, [handleKeyDown]);

	return(
		<>
      <ThemeProvider theme={currentTheme}>
        <Main>
          <TypeTestHandler
            documentIsFocused={documentIsFocused}
            currentTheme={currentTheme}
            setTheme={setTheme}
            hotkeyPressed={hotkeyPressed}
            currentLayout={currentLayout}
            setCurrentLayout={setCurrentLayout}
          />
        </Main>
      </ThemeProvider>
		</>
	);
} 

export default App;