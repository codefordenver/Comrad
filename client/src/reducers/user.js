import {
  USER_ADD,
  USER_ALERT,
  USER_CLEAR,
  USER_ERROR,
  USER_FIND_ALL,
  USER_LOADING,
} from '../actions/types';

const initialState = {
  alert: {
    display: false,
    header: '',
    text: '',
    type: '',
  },
  doc: {},
  docs: [],
  error: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_ADD:
      return {
        ...payload,
      };
    case USER_FIND_ALL:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case USER_CLEAR:
      return {
        ...initialState,
      };
    case USER_ERROR:
      return {
        ...payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_ALERT:
      return {
        alert: {
          display: true,
          ...payload,
        },
        loading: false,
      };
    default:
      return state;
  }
};
