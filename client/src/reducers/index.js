import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';
import event from './event';

export default combineReducers({
  auth,
  event,
  form: formReducer
})