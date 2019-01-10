import {
  SEARCH_LOADING,
  SEARCH_LIBRARY,
  SEARCH_UPDATE,
  SEARCH_USERS,
} from '../actions/types';

const initialState = {
  docs: [],
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SEARCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_LIBRARY:
      return {
        docs: payload,
        loading: false,
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: payload,
      };
    case SEARCH_UPDATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
