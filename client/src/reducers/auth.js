import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR } from '../actions/types';

const initialState = {
  email: '',
  status: 'fetching',
  errorMessage: '',
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case AUTH_LOGIN:
      return {
        ...payload,
        status: true,
        errorMessage: '',
      };

    case AUTH_LOGOUT:
      return {
        status: false,
        errorMessage: '',
      };

    case AUTH_ERROR:
      return {
        status: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
}
