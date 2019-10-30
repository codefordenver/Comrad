import { trafficTypes } from './trafficTypes';

const initialState = {
  doc: null,
  docs: [],
  loading: false,
};

export const trafficReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case trafficTypes.CLEAR:
      return initialState;
    case trafficTypes.FIND:
      return {
        ...state,
        docs: payload,
        loading: false,
      };
    case trafficTypes.FIND_BY_ID:
      return {
        ...state,
        doc: payload,
        loading: false,
      };
    case trafficTypes.LOAD:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
