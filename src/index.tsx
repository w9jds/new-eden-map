import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';

import Application from 'components/Application';
import { ApplicationState } from 'models/states';

import current from 'store/current/reducer';

const store = createStore(
  combineReducers<ApplicationState>({
    current,
  }),
  applyMiddleware()
);

createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <Application />
    </Provider>
  );
