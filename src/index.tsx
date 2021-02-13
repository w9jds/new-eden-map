import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';

import Application from 'components/Application';
import { ApplicationState } from 'models/states';

const store = createStore(  
  combineReducers<ApplicationState>({}), 
  applyMiddleware()
);

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);


