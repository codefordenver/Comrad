import { ALBUM_FIND_ONE, ALBUM_LOAD } from './albumTypes';

const initialState = {
  tracks: [],
  doc: {},
  error: null,
  loading: false,
  loadingTracks: false,
};

export const albumReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALBUM_FIND_ONE:
      return {
        ...state,
        loading: false,
        doc: {
          ...payload,
        },
      };
    case ALBUM_LOAD:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
