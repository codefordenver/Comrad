import { INPUT_CLEAR, INPUT_UPDATE } from '../actions/types';

const initialState = {};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case INPUT_UPDATE:
      return {
        ...state,
        ...payload,
      };
    case INPUT_CLEAR:
      delete state[payload];
      return state;
    default:
      return state;
  }
}
