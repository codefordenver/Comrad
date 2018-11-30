import { combineReducers } from 'redux';

import auth from './auth';
import search from './search';
import user from './user';
import events from './event';

export default combineReducers({
  auth,
  events,
  search,
  user
});