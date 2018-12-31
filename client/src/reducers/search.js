import { SEARCH_LOADING, SEARCH_LIBRARY, SEARCH_USERS } from '../actions/types';

const initialState = {
  data: [],
  loading: false,
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
        data: payload,
        loading: false,
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
}
