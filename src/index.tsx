import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { ThemeProvider, createTheme } from '@mui/material';

import Application from 'components/Application';
import { ApplicationState } from 'models/states';

import current from 'store/current/reducer';

const store = createStore(
  combineReducers<ApplicationState>({
    current,
  }),
  applyMiddleware()
);

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root'))
  .render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Application />
      </Provider>
    </ThemeProvider>
  );
