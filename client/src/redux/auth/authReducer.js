import { AUTH_ALERT, AUTH_LOADING, AUTH_LOGIN, AUTH_LOGOUT } from './authTypes';

const initialState = {
  alert: {
    display: false,
    header: '',
    text: '',
    type: '',
  },
  doc: {},
  loading: false,
  permission: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN:
      const { permission } = payload.station;

      return {
        ...initialState,
        doc: { ...payload },
        permission,
      };

    case AUTH_LOGOUT:
      return {
        ...initialState,
      };

    case AUTH_ALERT:
      return {
        ...state,
        alert: {
          display: true,
          ...payload,
        },
        permission: null,
      };

    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
