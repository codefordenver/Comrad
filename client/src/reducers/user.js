import { USER_FIND_ONE, USER_ADD } from '../actions/types';

const initialState = {}

export default (state = initialState, {type, payload}) => {
  switch(type) {
    case USER_ADD:
      const user = payload;
      return {
        ...state,
        [user._id]: user
      } 
    default:
      return state;
  }
}