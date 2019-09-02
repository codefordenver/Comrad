import { genreTypes } from './genreTypes';

const initialState = {
  docs: {},
};

export const genreReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case genreTypes.FIND_ALL:
      return {
        docs: {
          ...payload,
        },
      };

    default:
      return state;
  }
};
