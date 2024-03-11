import './style.scss'   ;

console.log('Hello World')


// Get the Sass map of themes
const themes = {
    light: {
      backgroundColor: '#f5f5f5',
      textColor: '#333',
      linkColor: '#007bff',
      linkHoverColor: '#0056b3'
    },
    dark: {
      backgroundColor: '#333',
      textColor: '#f5f5f5',
      linkColor: '#00b8d9',
      linkHoverColor: '#0095c2'
    }
  };
  
  // Set the initial theme to light
  const theme = themes.light;
  
  // Get the root element
  const root = document.documentElement;
  
  // Set the CSS variables to the initial theme values
  root.style.setProperty('--background-color', theme.backgroundColor);
  root.style.setProperty('--text-color', theme.textColor);
  root.style.setProperty('--link-color', theme.linkColor);
  root.style.setProperty('--link-hover-color', theme.linkHoverColor);
  
  // Function to switch the theme
  function switchTheme(newTheme) {
    if (newTheme === 'dark' || newTheme === 'light') {
      const theme = themes[newTheme];
      root.style.setProperty('--background-color', theme.backgroundColor);
      root.style.setProperty('--text-color', theme.textColor);
      root.style.setProperty('--link-color', theme.linkColor);
      root.style.setProperty('--link-hover-color', theme.linkHoverColor);
    }
  }
  
  // Example usage
  switchTheme('dark');