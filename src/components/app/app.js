import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import g from '../../globals.js';
import TypeTestHandler from '../game/type-test-handler.js';


const Main = styled.main`
	height: 100%;
	width: 100%;
	position: fixed;
	/* padding: var(--default-padding); */
	background-color: ${g.bgcolor}; /* ??? */
	font-family: 'Roboto Mono', monospace;
`

const App = () => {

  // Keep track of whether document is focused.
  const [documentIsFocused, setDocumentIsFocused] = useState(document.hasFocus());

  useEffect(() => {
    document.addEventListener('blur', () => {
      setDocumentIsFocused(false);
    });
    document.addEventListener('focus', () => {
      setDocumentIsFocused(true);
    });

    // Only show focus outline when using keyboard.
		document.body.addEventListener('mousedown', function() {
			document.body.classList.add('no-outline');
		});

		document.body.addEventListener('keydown', function(event) {
			if (event.key === 'Tab') {
				document.body.classList.remove('no-outline');
			}
		});
  }, []);

	return(
		<>
			<Main>
				<TypeTestHandler documentIsFocused={documentIsFocused}/>
			</Main>
		</>
	);

} 

export default App;