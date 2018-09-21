import {
  EVENT_GET
} from '../actions/types';

const initialState = {
  status: 'fetching',
  errorMessage: ''
};

export default function(state = initialState, {type, payload}) {
  switch (type) {
    case EVENT_GET:
      return {
        ...payload,
        status: true,
        errorMessage: ''
      };

    default:
      return state;
  }
}
