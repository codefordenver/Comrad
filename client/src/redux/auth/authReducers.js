import {
  AUTH_ALERT,
  AUTH_ALERT_CLOSE,
  AUTH_LOADING,
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from './authTypes';

const initialState = {
  alert: {
    display: false,
    header: '',
    message: '',
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
    case AUTH_ALERT_CLOSE:
      const { alert } = initialState;

      return {
        ...state,
        alert,
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
