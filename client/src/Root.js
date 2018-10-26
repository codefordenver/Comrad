import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  auth: {
    status: 'fetching',
    errorMessage: ''
  }
}

export default ({ children }) => {
  
  const store = createStore(
    reducers, 
    initialState, 
    composeEnhancers(
      applyMiddleware(reduxThunk),
    )
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}