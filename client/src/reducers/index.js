import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import artist from './artist';
import auth from './auth';
import input from './input';
import library from './library';
import search from './search';
import modals from './modals';
import shows from './shows';
import traffic from './traffic';
import user from './user';
import users from './users';

export default combineReducers({
  artist,
  auth,
  input,
  library,
  search,
  modals,
  shows,
  traffic,
  user,
  users,
  form: formReducer,
});
