import { combineReducers } from 'redux';

import auth from './auth';
import form from './form';
import search from './search';
import user from './user';
import shows from './show';
import traffic from './traffic';

export default combineReducers({
  auth,
  form,
  search,
  shows,
  traffic,
  user,
});
