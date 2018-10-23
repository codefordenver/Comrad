import { SEARCH_ALL, SEARCH_USERS } from '../actions/types';

const initialState = {
  all: [],
  users: []
}

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case SEARCH_ALL: 
      return {
        ...state,
        all: payload
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