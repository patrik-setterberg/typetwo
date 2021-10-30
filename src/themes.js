/**
 * THEMES.JS
 * Collection of themes, passed as prop "theme" to <ThemeProvider>.
 */

// NICE GRADIENT FOR BACKGROUND? linear-gradient(to right, #29323c, #485563);

const themes = {
	/* dark: {
		primary: '#F2F4F3',
		highlight: '#F4CB4C',
		backgroundPrimary: '#262526',
		backgroundSecondary: '#1F1F21',
		backgroundTertiary: '#222',
	}, */

	dark: {
		primary: '#EEEEEE',
		/* highlight: '#f4d35e', */
		highlight: '#FFD369',
		backgroundPrimary: '#191d23',
		backgroundSecondary: '#121519',
		backgroundTertiary: '#20252d',
	},

	light: {
		primary: '#333',
		highlight: 'darkorange',
		backgroundPrimary: '#F2F4F3',
	}
}

export default themes;