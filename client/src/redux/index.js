import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { alertReducer } from './alert';
import { authReducer } from './auth';
import { configReducer } from './config';
import { genreReducer } from './genre';
import { hostGroupReducer } from './hostGroup';
import { libraryReducer } from './library';
import { modalReducer } from './modal';
import { playlistReducer } from './playlist';
import { resourceReducer } from './resource';
import { showReducer } from './show';
import { trafficReducer } from './traffic';
import { userReducer } from './user';

export * from './alert';
export * from './auth';
export * from './config';
export * from './genre';
export * from './hostGroup';
export * from './library';
export * from './playlist';
export * from './traffic';
export * from './user';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  config: configReducer,
  form: formReducer,
  genre: genreReducer,
  hostGroup: hostGroupReducer,
  library: libraryReducer,
  modal: modalReducer,
  playlist: playlistReducer,
  resource: resourceReducer,
  show: showReducer,
  traffic: trafficReducer,
  user: userReducer,
});
