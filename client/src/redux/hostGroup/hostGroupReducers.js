import { hostGroupTypes } from './hostGroupTypes';

const initialState = {
  doc: null,
  docs: [],
  docsByHosts: [],
  loading: false,
  loadingByHosts: false,
};

export const hostGroupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case hostGroupTypes.ADD:
      return {
        ...state,
        ...payload,
      };

    case hostGroupTypes.CLEAR:
      return {
        ...initialState,
      };

    case hostGroupTypes.FIND_ALL:
      return {
        ...state,
        loading: false,
        docs: payload,
      };

    case hostGroupTypes.FIND_BY_ID:
      return {
        ...state,
        doc: payload,
      };

    case hostGroupTypes.FOUND_BY_HOSTS:
      return {
        ...state,
        docsByHosts: payload,
        loadingByHosts: false,
      };

    case hostGroupTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    case hostGroupTypes.LOADING_BY_HOSTS:
      return {
        ...state,
        loadingByHosts: true,
      };

    case hostGroupTypes.UPDATE:
      return {
        ...state,
        doc: payload,
      };

    default:
      return state;
  }
};
