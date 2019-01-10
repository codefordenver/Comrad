import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_RESET,
} from '../actions/types';

const initialState = {
  data: {},
  status: 'fetching',
  message: '',
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case AUTH_LOGIN:
      return {
        data: {
          ...payload,
        },
        status: true,
        message: '',
      };

    case AUTH_LOGOUT:
      return {
        status: false,
        message: '',
      };

    case AUTH_ERROR:
      return {
        status: false,
        message: payload,
      };

    case AUTH_RESET:
      return {
        status: false,
        message: payload,
      };

    default:
      return state;
  }
}
