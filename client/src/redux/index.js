import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { albumReducer } from './album';
import { artistReducer } from './artist';
import { authReducer } from './auth';
import { libraryReducer } from './library';
import { modalReducer } from './modal';
import { showReducer } from './show';
import { trafficReducer } from './traffic';
import { userReducer } from './user';

export default combineReducers({
  album: albumReducer,
  artist: artistReducer,
  auth: authReducer,
  form: formReducer,
  library: libraryReducer,
  modal: modalReducer,
  show: showReducer,
  traffic: trafficReducer,
  user: userReducer,
});
