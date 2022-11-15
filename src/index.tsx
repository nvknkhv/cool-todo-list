import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import { store } from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  /* <React.StrictMode> */
  <ChakraProvider>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ChakraProvider>,
  /* </React.StrictMode> */
);
