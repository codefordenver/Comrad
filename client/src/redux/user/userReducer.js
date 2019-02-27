import {
  USER_ADD,
  USER_ALERT,
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
    text: '',
    type: '',
  },
  doc: {},
  docs: [],
  error: null,
  loading: false,
  search: {
    filter: 'all',
    query: '',
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
        alert: {
          display: true,
          ...payload,
        },
        loading: false,
      };
    case USER_SEARCH:
      const { docs, filter, query } = payload;

      return {
        ...state,
        docs,
        loading: false,
        search: {
          filter,
          query,
        },
      };
    default:
      return state;
  }
};
