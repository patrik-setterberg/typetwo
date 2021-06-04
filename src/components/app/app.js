import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import g, {themeSettings} from '../../globals.js';
import words from '../../assets/game/words.js';
import themes from '../../themes.js';
import {ThemeProvider} from 'styled-components';
import TypeTestHandler from '../game/type-test-handler.js';

/**
 * TEMP / TODO:
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
  // Theme passed to ThemeProvider, wrapping entire app content.
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