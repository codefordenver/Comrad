import { userTypes } from './userTypes';

const initialState = {
  doc: {},
  docs: [],
  loading: false,
  searchParams: {
    status: 'all',
    q: '',
  },
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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

    case userTypes.ADD:
      return {
        ...payload,
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

    case userTypes.CREATE:
      return {
        ...state,
        ...payload,
      };

    case userTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
