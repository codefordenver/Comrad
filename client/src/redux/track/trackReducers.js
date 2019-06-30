import { trackTypes } from './trackTypes';

const initialState = {
  alert: {
    display: false,
    header: '',
    message: '',
    type: '',
  },
  doc: null,
  error: null,
  loading: false,
};

export const trackReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case trackTypes.ADD:
      return {
        doc: {
          ...payload,
        },
      };
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
    case trackTypes.FIND_ONE:
      return {
        ...state,
        doc: {
          ...payload,
        },
        loading: false,
      };
    case trackTypes.LOAD:
      return {
        ...state,
        loading: true,
      };
    case trackTypes.EDIT:
      return {
        ...state,
        doc: {
          ...payload,
        },
      };
    default:
      return state;
  }
};
