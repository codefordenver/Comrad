import { hostGroupTypes } from './hostGroupTypes';

const initialState = {
  doc: {},
  docsByHosts: [],
  loadingByHosts: false,
};

export const hostGroupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case hostGroupTypes.ADD:
      return {
        ...state,
        ...payload,
      };

    case hostGroupTypes.FOUND_BY_HOSTS:
      return {
        ...state,
        docsByHosts: payload,
        loadingByHosts: false,
      };

    case hostGroupTypes.LOADING_BY_HOSTS:
      return {
        ...state,
        loadingByHosts: true,
      };

    default:
      return state;
  }
};
