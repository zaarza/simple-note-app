import { createContext } from 'react';

const LocaleContext = createContext('en');
const LocaleContextProvider = LocaleContext.Provider;
const LocaleContextConsumer = LocaleContext.Consumer;

export { LocaleContext, LocaleContextProvider, LocaleContextConsumer };
