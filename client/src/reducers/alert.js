import { ALERT_CLEAR, ALERT_UPDATE } from '../actions/types';

const initialState = {
  display: false,
  header: '',
  text: '',
  type: '',
};

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
