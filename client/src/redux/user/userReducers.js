import { userTypes } from './userTypes';

const initialState = {
  doc: {},
  docs: [],
  loading: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userTypes.ADD:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case userTypes.CLEAR:
      return {
        ...initialState,
      };

    case userTypes.CLEAR_SEARCH:
      return {
        ...state,
        search: {
          ...initialState.search,
        },
      };

    case userTypes.CREATE_API_KEY:
      return {
        ...state,
        doc: {
          ...payload.doc,
        },
      };

    case userTypes.DELETE_API_KEY:
      return {
        ...state,
        doc: {
          ...payload.doc,
        },
      };

    case userTypes.FIND_ONE:
      return {
        ...state,
        doc: {
          ...payload,
        },
        loading: false,
      };

    case userTypes.FIND_ALL:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case userTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    case userTypes.SEARCH:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case userTypes.SEARCH_HOSTS:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case userTypes.UPDATE:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    default:
      return state;
  }
};
