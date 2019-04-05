import {
  ARTIST_ADD,
  ARTIST_ALERT,
  ARTIST_FIND_ALBUMS,
  ARTIST_FIND_ONE,
  ARTIST_EDITING_NAME,
  ARTIST_LOAD_ALBUMS,
  ARTIST_LOAD,
  ARTIST_UPDATE,
} from './artistTypes';

const initialState = {
  albums: [],
  doc: {},
  error: null,
  loading: false,
  loadingAlbums: false,
};

export const artistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTIST_ADD:
      return {
        doc: {
          ...payload,
        },
      };
    case ARTIST_ALERT:
      return {
        ...state,
        alert: {
          display: true,
          ...payload,
        },
      };
    case ARTIST_FIND_ALBUMS:
      return {
        ...state,
        loadingAlbums: false,
        albums: payload,
      };
    case ARTIST_FIND_ONE:
      return {
        ...state,
        loading: false,
        doc: {
          ...payload,
        },
      };
    case ARTIST_EDITING_NAME:
      return {
        ...state,
        editingName: payload.editingName,
      };
    case ARTIST_LOAD:
      return {
        ...state,
        loading: true,
      };
    case ARTIST_LOAD_ALBUMS:
      return {
        ...state,
        loadingAlbums: true,
      };
    case ARTIST_UPDATE:
      return {
        ...state,
        doc: {
          ...payload,
        },
        loading: false,
      };
    default:
      return state;
  }
};
