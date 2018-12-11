import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './utils/serviceWorker/registerServiceWorker';

import Root from './components/Root';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root'),
);
registerServiceWorker();
