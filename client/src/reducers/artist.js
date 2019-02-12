import {
  ARTIST_ALL,
  ARTIST_CLEAR,
  ARTIST_ERROR,
  ARTIST_LOADING,
  ARTIST_UPDATE,
} from '../actions/types';

const initialState = {
  docs: [],
  error: false,
  loading: false,
  q: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTIST_CLEAR:
      return initialState;
    case ARTIST_ERROR:
      return {
        ...state,
        ...payload,
      };
    case ARTIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ARTIST_ALL:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case ARTIST_UPDATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
