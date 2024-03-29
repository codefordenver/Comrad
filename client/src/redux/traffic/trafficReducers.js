import { trafficTypes } from './trafficTypes';

const initialState = {
  addDeleteActionReturnLocation: '/traffic',
  doc: null,
  docs: [],
  docsForDropdown: [],
  earliest: null,
  loading: false,
  loadingSearch: false,
  searchString: null,
  underwriterSearchDocs: [],
  underwriterSearchString: null,
};

export const trafficReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case trafficTypes.ADD_DELETE_ACTION_RETURN_LOCATION:
      return {
        ...state,
        addDeleteActionReturnLocation: payload,
      };
    case trafficTypes.CLEAR:
      return initialState;
    case trafficTypes.CLEAR_DOCS:
      return {
        ...state,
        docs: initialState.docs,
      };
    case trafficTypes.EARLIEST:
      return {
        ...state,
        earliest: payload,
        loading: false,
      };
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
    case trafficTypes.SEARCH_UNDERWRITERS:
      return {
        ...state,
        loadingSearch: false,
        underwriterSearchDocs: payload.docs,
        underwriterSearchString: payload.searchString,
      };
    default:
      return state;
  }
};
