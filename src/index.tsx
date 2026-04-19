import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { ThemeProvider, createTheme } from '@mui/material';

import Application from 'components/Application';

import sagas from 'store/sagas';
import kills from 'store/kills/reducer';
import current from 'store/current/reducer';
import navigation from 'store/navigation/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from 'store/middleware';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  listenerMiddleware.middleware,
  sagaMiddleware,
];

const store = configureStore({
  reducer: {
    current: current.reducer,
    navigation: navigation.reducer,
    kills: kills.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(middleware),
});

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    htmlFontSize: 10
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ 
    uri: 'https://gql.new-eden.io/graphql' 
  }),
});

sagaMiddleware.run(sagas);

createRoot(document.getElementById('root'))
  .render(
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Application />
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
