import { LIBRARY_LOADING, LIBRARY_SEARCH } from './libraryTypes';

const initialState = {
  data: [],
  error: false,
  loading: false,
  search: {
    filter: 'all',
  },
};

export const libraryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LIBRARY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LIBRARY_SEARCH:
      const { nextPage, results, totalPages } = payload;

      return {
        ...state,
        data: results,
        loading: false,
      };
    default:
      return state;
  }
};
