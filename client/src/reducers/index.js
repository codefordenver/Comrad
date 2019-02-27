import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import artist from './artist';
import auth from './auth';
import library from './library';
import modals from './modals';
import shows from './shows';
import traffic from './traffic';
import user from './user';

export default combineReducers({
  artist,
  auth,
  form: formReducer,
  library,
  modals,
  shows,
  traffic,
  user,
});
