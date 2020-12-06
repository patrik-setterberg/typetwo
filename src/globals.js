import {createGlobalStyle} from 'styled-components';

// MEDIA BREAKPOINT VARS TWEAK HERE
const largestSmall = 767; // px
const largestMedium = 1299; // px

const g = {

	// Media breakpoints
	small: `only screen and (max-width: ${largestSmall}px)`,
	medium: `only screen and (min-width: ${largestSmall+1}px) and (max-width: ${largestMedium}px)`,
	atMostMedium: `only screen and (max-width: ${largestMedium}px)`,
	atleastMedium: `only screen and (min-width: ${largestSmall+1}px)`,
  large: `only screen and (min-width: ${largestMedium+1}px)`,
  
  bgcolor: '#333',
}

export default g;

const GlobalStyle = createGlobalStyle`
	:root {
    --default-padding: 1.5rem;
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
`

export {GlobalStyle};