import {
  USER_ADD,
  USER_ALERT,
  USER_ALERT_CLOSE,
  USER_CLEAR,
  USER_ERROR,
  USER_FIND_ALL,
  USER_LOADING,
  USER_SEARCH,
} from './userTypes';

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
  search: {
    filter: 'All',
    s: '',
  },
};

export const userReducer = (state = initialState, { type, payload }) => {
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
        ...state,
        ...payload,
        loading: false,
      };
    case USER_SEARCH:
      return {
        ...state,
        ...payload,
        alert: {
          ...initialState.alert,
        },
        loading: false,
      };
    case USER_ALERT_CLOSE:
      const { alert } = initialState;

      return {
        ...state,
        alert,
      };
    default:
      return state;
  }
};
