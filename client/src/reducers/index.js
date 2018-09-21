import { combineReducers } from 'redux';
import auth from './auth';
import event from './event';

export default combineReducers({
  auth,
  event,
})