import { albumTypes } from './albumTypes';

const initialState = {
  doc: {},
  docs: [],
  error: null,
  loading: false,
};

export const albumReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case albumTypes.FIND_ONE:
      return {
        ...state,
        loading: false,
        doc: {
          ...payload,
        },
      };
    case albumTypes.LOAD:
      return {
        ...state,
        loading: true,
      };
    case albumTypes.CLEAR:
      return {
        ...state,
        doc: [],
      };

    case albumTypes.ADD:
      return {
        ...state,
        doc: {
          ...payload,
        },
      };

    case albumTypes.EDIT:
      return {
        ...state,
        doc: {
          ...payload,
        },
      };
    default:
      return state;
  }
};
