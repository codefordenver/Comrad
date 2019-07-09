import { albumTypes } from './albumTypes';

const initialState = {
  alert: {
    display: false,
    header: '',
    message: '',
    type: '',
  },
  doc: {},
  docs: [],
  error: null,
  loading: false,
};

export const albumReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case albumTypes.ALERT:
      return {
        ...state,
        alert: {
          display: true,
          ...payload,
        },
      };
    case albumTypes.ALERT_CLOSE:
      const { alert } = initialState;

      return {
        ...state,
        alert,
      };
    case albumTypes.FIND_ONE:
      return {
        ...state,
        loading: false,
        doc: {
          ...payload,
        },
      };
    case albumTypes.LOAD:
      return {
        ...state,
        loading: true,
      };
    case albumTypes.CLEAR:
      return {
        ...state,
        doc: [],
      };

    case albumTypes.ADD:
      return {
        ...state,
        doc: {
          ...payload,
        }
      },

    case albumTypes.EDIT:
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
