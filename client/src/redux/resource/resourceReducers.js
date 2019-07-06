import { resourceTypes } from './resourceTypes';

const initialState = {
  doc: {},
  docs: [],
  loading: false,
};

export const resourceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case resourceTypes.FIND_ALL:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case resourceTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
