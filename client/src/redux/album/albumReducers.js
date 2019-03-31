import {
  ALBUM_FIND_ONE,
  ALBUM_FIND_TRACKS,
  ALBUM_LOAD,
  ALBUM_LOAD_TRACKS,
} from './albumTypes';

const initialState = {
  tracks: [],
  doc: {},
  error: null,
  loading: false,
  loadingTracks: false,
};

export const albumReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALBUM_FIND_TRACKS:
      return {
        ...state,
        loadingTracks: false,
        tracks: payload,
      };
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
    case ALBUM_LOAD_TRACKS:
      return {
        ...state,
        loadingTracks: true,
      };
    default:
      return state;
  }
};
