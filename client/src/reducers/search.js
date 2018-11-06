import { SEARCH_LIBRARY, SEARCH_USERS } from '../actions/types';

const initialState = {
  library: [],
  users: []
}

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case SEARCH_LIBRARY: 
      return {
        ...state,
        library: payload
      }
    case SEARCH_USERS:
      return {
        ...state,
        users: payload
      }
    default:
      return state;
  }
}