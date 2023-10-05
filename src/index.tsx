import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { ThemeProvider, createTheme } from '@mui/material';

import Application from 'components/Application';
import { ApplicationState } from 'models/states';

import sagas from 'store/sagas';
import kills from 'store/kills/reducer';
import current from 'store/current/reducer';
import navigation from 'store/navigation/reducer';

const middleware = [
  createSagaMiddleware(),
];

const store = createStore(
  combineReducers<ApplicationState>({
    current,
    navigation,
    kills,
  }),
  applyMiddleware(...middleware)
);

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

middleware[0].run(sagas);

createRoot(document.getElementById('root'))
  .render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Application />
      </Provider>
    </ThemeProvider>
  );
