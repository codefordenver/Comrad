import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

export default ({ children }) => {
  
  const store = createStore(
    reducers, 
    {
      auth: {
        status: 'fetching'
      }
    }, 
    compose(
      applyMiddleware(reduxThunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}