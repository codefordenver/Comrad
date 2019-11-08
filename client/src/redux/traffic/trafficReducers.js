import { trafficTypes } from './trafficTypes';

const initialState = {
  doc: null,
  docs: [],
  docsForDropdown: [],
  loading: false,
  loadingSearch: false,
  searchString: null,
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
    case trafficTypes.LOADING_SEARCH:
      return {
        ...state,
        loadingSearch: true,
      };
    case trafficTypes.SEARCH:
      return {
        ...state,
        loadingSearch: false,
        docsForDropdown: payload.docs,
        searchString: payload.searchString,
      };
    default:
      return state;
  }
};
