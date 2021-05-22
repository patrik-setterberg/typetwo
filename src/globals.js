import {createGlobalStyle} from 'styled-components';

// Supported keyboard layouts.
const LAYOUTS = {
  DVORAK_US: [
    ["'", ',', '.', 'p', 'y', 'f', 'g', 'c', 'r', 'l', '/', '='],
    ['a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's', '-'],
    ['\u21e7', ';', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z', '\u21e7'],
  ],
  QWERTY_US: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['\u21e7', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '\u21e7'],
  ],
  QWERTY_SE: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å', '"'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', "'"],
    ['\u21e7', '<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', '\u21e7'],
  ],
  QWERTZ_DE: [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü', '+'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä', '#'],
    ['\u21e7', '<', 'y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', '\u21e7'],
  ],
  AZERTY_FR: [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '^', '$'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'ù', '*'],
    ['\u21e7', '<', 'w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '!', '\u21e7'],
  ],
};

export {LAYOUTS};

/**
 * MEDIA BREAKPOINT VARS TWEAK HERE
 */
const largestSmall = 767; // px
const largestMedium = 1099; // px

/**
 * GLOBAL VARS
 */
const g = {

  // Media breakpoints
  small: `only screen and (max-width: ${largestSmall}px)`,
  medium: `only screen and (min-width: ${largestSmall+1}px) and (max-width: ${largestMedium}px)`,
  atMostMedium: `only screen and (max-width: ${largestMedium}px)`,
  atleastMedium: `only screen and (min-width: ${largestSmall+1}px)`,
  large: `only screen and (min-width: ${largestMedium+1}px)`,
  
  bgcolor: '#333',

  // Number of test words displayed on screen
  TEST_WORD_COUNT: 32,

  // TEST DURATION OPTIONS (in seconds)
  TEST_LENGTH_SHORT: 15,
  TEST_LENGTH_MEDIUM: 30,
  TEST_LENGTH_LONG: 60,

  TEST_LENGTH_DEFAULT: 30,

  // Set how often component checks if document is focused
  FOCUS_CHECK_INTERVAL: 66,

  RESIZE_CHECK_INTERVAL: 50,

  // COOKIE SETTINGS
  SCORE_COOKIE_NAME: 'highest_score',
  TIMESTAMP_COOKIE_NAME: 'time',
  COOKIE_MAX_AGE: 2592000, // 60'60*24*30 = 30 days

  KEYBOARD_DEFAULT_LAYOUT: 'QWERTY_SE',
  KEYBOARD_HIGHLIGHT_DURATION: 160,
}

export default g;

const GlobalStyle = createGlobalStyle`
  :root {
    --default-padding: 1.5rem;
    
    --default-timing: cubic-bezier(0.78, 0.2, 0.05, 1.0);

    --caret-opacity: 0.7;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
    box-sizing: border-box;
  }

  body {
    
  }
  
  body.no-outline:focus,
  body.no-outline *:focus ~ * {
    outline: none !important;
  }

  *:active,
  *:active ~ * {
    outline: none;
  }

  #root {
    
  }

  @media ${g.large} {
    :root {
      --default-padding: 2rem;
    }
  }

  /* ANIMATIONS */
  @keyframes caret-blink {
    from {
      opacity: var(---caret-opacity);
    }

    47% {
      opacity: var(---caret-opacity);
    }

    53% {
      opacity: 0;
    }

    to {
      opacity: 0;
    }
  }
`

export {GlobalStyle};

const themeSettings = {
  DEFAULT_THEME: 'dark',
}

export {themeSettings};