import { combineReducers } from 'redux';

import auth from './auth';
import input from './input';
import message from './message';
import search from './search';
import shows from './show';
import traffic from './traffic';
import user from './user';

export default combineReducers({
  auth,
  input,
  message,
  search,
  shows,
  traffic,
  user,
});
