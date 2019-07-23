import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { albumReducer } from './album';
import { alertReducer } from './alert';
import { artistReducer } from './artist';
import { authReducer } from './auth';
import { configReducer } from './config';
import { genreReducer } from './genre';
import { libraryReducer } from './library';
import { modalReducer } from './modal';
import { permissionReducer } from './permission';
import { resourceReducer } from './resource';
import { showReducer } from './show';
import { trackReducer } from './track';
import { trafficReducer } from './traffic';
import { userReducer } from './user';

export * from './album';
export * from './alert';
export * from './artist';
export * from './auth';
export * from './config';
export * from './genre';
export * from './permission';
export * from './track';
export * from './user';

export default combineReducers({
  album: albumReducer,
  alert: alertReducer,
  artist: artistReducer,
  auth: authReducer,
  config: configReducer,
  form: formReducer,
  genre: genreReducer,
  library: libraryReducer,
  modal: modalReducer,
  permission: permissionReducer,
  resource: resourceReducer,
  show: showReducer,
  track: trackReducer,
  traffic: trafficReducer,
  user: userReducer,
});
