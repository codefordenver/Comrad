import { combineReducers } from 'redux';

import auth from './auth';
import search from './search';
import user from './user';
import shows from './shows';
import traffic from './traffic';


export default combineReducers({
  auth,
  search,
  shows,
  traffic,
  user
});