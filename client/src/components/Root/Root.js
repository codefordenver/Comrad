import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../../redux';

import '../../sass/index.scss';
import 'react-table/react-table.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

export default ({ children }) => {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(reduxThunk)),
  );

  return <Provider store={store}>{children}</Provider>;
};
