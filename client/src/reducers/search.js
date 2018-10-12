import { SEARCH_ALL } from '../actions/types';

const initialState = {
  results: []
}

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case SEARCH_ALL: 
      return {
        results: payload
      }
    default:
      return state;
  }
}