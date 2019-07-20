import { genreTypes } from './genreTypes';

const initialState = {
  doc: {},
  docs: [],
  loading: false,
  search: {
    filter: 'all',
    q: '',
  },
};

export const genreReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case genreTypes.FIND_ALL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
