import { genreTypes } from './userTypes';

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
        ...payload,
        loading: false,
      };

    default:
      return state;
  }
};
