import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';
import search from './search';
import events from './event';

export default combineReducers({
  auth,
  search,
  events,
  form: formReducer,
})