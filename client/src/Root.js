import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

export default ({ children }) => {
  
  const store = createStore(
    reducers, 
    {
      auth: { authenticated: localStorage.getItem('token') }
    }, 
    applyMiddleware(reduxThunk)
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}