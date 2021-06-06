import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import g, {themeSettings} from '../../globals.js';
import words from '../../assets/game/words.js';
import themes from '../../themes.js';
import {ThemeProvider} from 'styled-components';
import TypeTestHandler from '../game/type-test-handler.js';

/**
 * TODO:
 * Store control panel's settings somewhere. Probably in a cookie.
 * Make header responsive.
 * More theming.
 * Keyboard layout selector.
 * Re-think auto-focusing (would be nice to be able to navigate control panel with keyboard).
 * Allow next word even if current incomplete, allow input longer than current word.
 * Overhaul test score calculation.
 * Find new approach for test time countdown.
 * Name & logo.
 * Control panel-like "help panel", teaching hotkeys (and maybe test-instructions?)
 * Footer?
 * testWords in different languages?
 * Context to get rid of some prop drilling?
 */

const Main = styled.main`
	height: 100%;
	width: 100%;
	position: fixed;
	background-color: ${props => props.theme.backgroundPrimary};
	font-family: var(--font-main);
`

const App = () => {
  // Theme passed to ThemeProvider, wrapping entire app.
  const [currentTheme, setCurrentTheme] = useState(themes[themeSettings.DEFAULT_THEME]);
  const setTheme = (theme) => {
    setCurrentTheme(themes[theme]);
  }

  // Disable focus highlighting when using mouse.
  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.add('no-outline');
    }

		document.body.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.body.removeEventListener('mousedown', handleMouseDown);
    }
  }, []);

  // testWords related stuff awkwardly here instead of in type-test-handler.js to prevent a couple re-renders...
  // Load an array of unique words.
  const loadWords = () => {
    let usedWords = [];
    let wordArr = [];

    while (wordArr.length < g.TEST_WORD_COUNT) {
      let word = words[Math.floor(Math.random() * words.length)];
      if (!usedWords.includes(word)) {
        usedWords.push(word);
        wordArr.push(word.split(''));
      }
    }
    return wordArr;
  }

  const [testWords, setTestWords] = useState(loadWords());

	return(
		<>
      <ThemeProvider theme={currentTheme}>
        <Main>
          <TypeTestHandler
            currentTheme={currentTheme}
            setTheme={setTheme}
            testWords={testWords}
            setTestWords={setTestWords}
            loadWords={loadWords}
          />
        </Main>
      </ThemeProvider>
		</>
	);
} 

export default App;