import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { albumReducer } from './album';
import { alertReducer } from './alert';
import { artistReducer } from './artist';
import { authReducer } from './auth';
import { configReducer } from './config';
import { libraryReducer } from './library';
import { modalReducer } from './modal';
import { permissionReducer } from './permission';
import { playlistReducer } from './playlist';
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
export * from './permission';
export * from './playlist';
export * from './track';
export * from './traffic';
export * from './user';

export default combineReducers({
  album: albumReducer,
  alert: alertReducer,
  artist: artistReducer,
  auth: authReducer,
  config: configReducer,
  form: formReducer,
  library: libraryReducer,
  modal: modalReducer,
  permission: permissionReducer,
  playlist: playlistReducer,
  resource: resourceReducer,
  show: showReducer,
  track: trackReducer,
  traffic: trafficReducer,
  user: userReducer,
});
