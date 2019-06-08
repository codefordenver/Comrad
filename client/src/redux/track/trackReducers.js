import { trackTypes } from './trackTypes';

const initialState = {
  alert: {
    display: false,
    header: '',
    message: '',
    type: '',
  },
  error: null,
  loading: false,
};

export const trackReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case trackTypes.ALERT:
      return {
        ...state,
        alert: {
          display: true,
          ...payload,
        },
      };
    case trackTypes.ALERT_CLOSE:
      const { alert } = initialState;

      return {
        ...state,
        alert,
      };
    default:
      return state;
  }
};
