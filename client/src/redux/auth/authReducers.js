import { authTypes } from './authTypes';

const initialState = {
  doc: {},
  loading: false,
  loggedIn: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.LOGIN:
      return {
        ...initialState,
        ...payload,
        loggedIn: true,
      };

    case authTypes.LOGOUT:
      return {
        ...initialState,
      };

    case authTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
