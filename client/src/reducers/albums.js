import { SAVE_ALBUM } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case SAVE_ALBUM:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}