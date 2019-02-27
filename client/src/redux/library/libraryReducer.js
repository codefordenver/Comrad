import {
  LIBRARY_CLEAR,
  LIBRARY_ERROR,
  LIBRARY_LOADING,
  LIBRARY_SEARCH,
} from './libraryTypes';

const initialState = {
  docs: null,
  error: false,
  loading: false,
  q: false,
};

export const libraryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LIBRARY_CLEAR:
      return {
        ...initialState,
      };
    case LIBRARY_ERROR:
      return {
        ...state,
        ...payload,
      };
    case LIBRARY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LIBRARY_SEARCH:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
