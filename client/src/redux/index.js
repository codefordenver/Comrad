import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { albumReducer } from './album';
import { alertReducer } from './alert';
import { artistReducer } from './artist';
import { authReducer } from './auth';
import { libraryReducer } from './library';
import { modalReducer } from './modal';
import { showReducer } from './show';
import { trackReducer } from './track';
import { trafficReducer } from './traffic';
import { userReducer } from './user';

export * from './album';
export * from './alert';
export * from './auth';
export * from './track';
export * from './user';

export default combineReducers({
  album: albumReducer,
  alert: alertReducer,
  artist: artistReducer,
  auth: authReducer,
  form: formReducer,
  library: libraryReducer,
  modal: modalReducer,
  show: showReducer,
  track: trackReducer,
  traffic: trafficReducer,
  user: userReducer,
});
