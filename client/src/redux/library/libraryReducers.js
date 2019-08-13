import { libraryTypes } from './libraryTypes';

const initialState = {
  docs: null,
  doc: null,
  editingName: false,
  loading: false,
  loadingError: false,
  loadingSearch: true,
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
    case libraryTypes.LOAD:
      return {
        ...state,
        loading: true,
        loadingError: false,
      };
    case libraryTypes.LOADING_ERROR:
      return {
        ...state,
        loading: false,
        loadingError: true,
      };
    case libraryTypes.LOADING_SEARCH:
      return {
        ...state,
        loadingSearch: true,
      };
    case libraryTypes.SEARCH:
      return {
        ...state,
        docs: payload.docs,
        loadingSearch: false,
        searchString: payload.searchString,
        totalPages: payload.totalPages,
      };
    case libraryTypes.UPDATE:
      return {
        ...state,
        doc: {
          ...payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
