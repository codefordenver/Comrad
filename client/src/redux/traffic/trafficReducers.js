import { trafficTypes } from './trafficTypes';

const initialState = {
  docs: [],
  loading: false,
};

export const trafficReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case trafficTypes.FIND:
      return {
        ...state,
        docs: payload,
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
