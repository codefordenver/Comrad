import { MESSAGE_CLEAR, MESSAGE_UPDATE } from '../actions/types';

const initialState = {};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case MESSAGE_UPDATE:
      return {
        ...payload,
      };
    case MESSAGE_CLEAR:
      return initialState;
    default:
      return state;
  }
}
