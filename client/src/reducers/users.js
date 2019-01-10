import { USERS_SEARCH, USERS_UPDATE } from '../actions/types';

const initialState = {
  docs: [],
  loading: false,
  limit: 0,
  offset: 0,
  page: 0,
  pages: 0,
  search: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS_SEARCH:
      return {
        ...state,
        ...payload,
      };
    case USERS_UPDATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
