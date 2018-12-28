import { combineReducers } from 'redux';

import auth from './auth';
import form from './form';
import message from './message';
import search from './search';
import shows from './show';
import traffic from './traffic';
import user from './user';

export default combineReducers({
  auth,
  form,
  message,
  search,
  shows,
  traffic,
  user,
});
