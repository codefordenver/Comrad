import { combineReducers } from 'redux';

import auth from './auth';
import input from './input';
import search from './search';
import modals from './modals';
import shows from './shows';
import traffic from './traffic';
import user from './user';
import users from './users';

export default combineReducers({
  auth,
  input,
  search,
  modals,
  shows,
  traffic,
  user,
  users,
});
