import {createGlobalStyle} from 'styled-components';

/**
 * MEDIA BREAKPOINT VARS TWEAK HERE
 */
const largestSmall = 767; // px
const largestMedium = 1299; // px

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

  // TYPE TEST CONFIGURATION VARS
  WORDS_PER_ROW: 9,
  ROW_COUNT: 3,

  // TEST DURATION OPTIONS (in seconds)
  
  TEST_LENGTH_SHORT: 15,
  TEST_LENGTH_MEDIUM: 30,
  TEST_LENGTH_LONG: 60,

  TEST_LENGTH_DEFAULT: 15,

  // Set how often component checks if document is focused
  FOCUS_CHECK_INTERVAL: 66,
}

export default g;

const GlobalStyle = createGlobalStyle`
  :root {
    --default-padding: 1.5rem;
    
    --default-timing: cubic-bezier(0.78, 0.2, 0.05, 1.0);

    --caret-opacity: 0.8;
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