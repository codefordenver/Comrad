import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import axios from 'axios';

import Root from './components/Root';

// redirect users to login page if AJAX requests indicate they have been logged out
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== '/'
    ) {
      console.log('401 error, redirecting to login page');
      window.location.href =
        '/?reauthenticate&returnUrl=' +
        encodeURIComponent(window.location.pathname);
    }
    throw error;
  },
);
axios.defaults.withCredentials = true;

ReactDOM.render(
  <Root>
    <Router>
      <App />
    </Router>
  </Root>,
  document.getElementById('root'),
);
