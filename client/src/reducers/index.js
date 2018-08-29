import { combineReducers } from 'redux';
import albumsReducer from './albums';

export default combineReducers({
  albums: albumsReducer
});