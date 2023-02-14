const { createContext } = require('react');

const ThemeContext = createContext('light');

const ThemeContextProvider = ThemeContext.Provider;
const ThemeContextConsumer = ThemeContext.Consumer;

export { ThemeContext, ThemeContextProvider, ThemeContextConsumer };
