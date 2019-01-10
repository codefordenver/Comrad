import { ALERT_CLEAR, ALERT_UPDATE } from '../actions/types';

const initialState = {};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case ALERT_UPDATE:
      return {
        ...payload,
      };
    case ALERT_CLEAR:
      return initialState;
    default:
      return state;
  }
}
