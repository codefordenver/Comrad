import { libraryTypes } from './libraryTypes';

const initialState = {
  docs: null,
  docsForDropdown: null,
  doc: null,
  editingName: false,
  itunesResults: null,
  itunesResult: null,
  loading: false,
  loadingError: false,
  loadingSearch: false,
  loadingSearchItunes: false,
  searchString: null,
  totalPages: null,
};

export const libraryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case libraryTypes.ADD:
      return {
        ...state,
        doc: {
          ...payload,
        },
      };
    case libraryTypes.CLEAR:
      return {
        ...initialState,
      };
    case libraryTypes.EDITING_NAME:
      return {
        ...state,
        editingName: payload.editingName,
      };
    case libraryTypes.FIND_ONE:
      return {
        ...state,
        loading: false,
        doc: {
          ...payload,
        },
      };
    case libraryTypes.FIND_ITUNES:
      return {
        ...state,
        loading: false,
        itunesResult: payload
      };
    case libraryTypes.LOAD:
      return {
        ...state,
        loading: true,
        loadingError: false,
      };
    case libraryTypes.LOAD_COMPLETE:
      return {
        ...state,
        loading: false
      };
    case libraryTypes.LOADING_ERROR:
      return {
        ...state,
        loading: false,
        loadingError: true,
        loadingSearchItunes: false,
      };
    case libraryTypes.LOADING_SEARCH:
      return {
        ...state,
        loadingSearch: true,
      };
    case libraryTypes.LOADING_SEARCH_ITUNES:
      return {
        ...state,
        loadingSearchItunes: true,
        itunesResults: null,
      };
    case libraryTypes.SEARCH_ITUNES:
      return {
        ...state,
        itunesResults: payload,
        loadingSearchItunes: false,
      };
    case libraryTypes.SEARCH:
      return {
        ...state,
        docs: payload.useDocsForDropdown ? state.docs : payload.docs,
        docsForDropdown: payload.useDocsForDropdown ? payload.docs : state.docs,
        loadingSearch: false,
        searchString: payload.searchString,
        totalPages: payload.totalPages,
      };
    case libraryTypes.UPDATE:
      return {
        ...state,
        doc: {
          ...state.doc,
          ...payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
