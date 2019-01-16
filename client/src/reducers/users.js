import {
  USERS_CLEAR,
  USERS_ERROR,
  USERS_LOADING,
  USERS_SEARCH,
  USERS_UPDATE,
} from '../actions/types';

const initialState = {
  docs: [],
  error: false,
  loading: false,
  q: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS_CLEAR:
      return initialState;
    case USERS_ERROR:
      return {
        ...state,
        ...payload,
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USERS_SEARCH:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case USERS_UPDATE:
      return {
        ...state,
        ...payload,
      };
    case USERS_ERROR:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    default:
      return state;
  }
};
