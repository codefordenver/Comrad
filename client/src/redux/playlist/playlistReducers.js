import { playlistTypes } from './playlistTypes';

const initialState = {
  doc: {},
  loading: false,
};

export const playlistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case playlistTypes.FIND_ONE:
      return {
        ...state,
        doc: payload,
        loading: false,
      };
    case playlistTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
