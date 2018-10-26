import { combineReducers } from 'redux';

import auth from './auth';
import search from './search';
import user from './user';

export default combineReducers({
  auth,
  search,
  user
});