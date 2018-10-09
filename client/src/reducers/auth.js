import {
  AUTH_SIGNIN,
  AUTH_SIGNOUT,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  email: '',
  status: 'fetching',
  errorMessage: ''
};

export default function(state = initialState, {type, payload}) {
  switch (type) {
    case AUTH_SIGNIN:
      return {
        ...payload,
        status: true,
        errorMessage: ''
      };

    case AUTH_SIGNOUT:
      return {
        ...payload,
        status: false,
        errorMessage: ''
      };

    case AUTH_ERROR:
      return {
        ...state,
        status: false,
        errorMessage: payload
      };

    default:
      return state;
  }
}
