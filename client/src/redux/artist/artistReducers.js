import { artistTypes } from './artistTypes';

const initialState = {
  doc: {},
  error: null,
  loading: false,
  loadingAlbums: false,
};

export const artistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case artistTypes.ADD:
      return {
        doc: {
          ...payload,
        },
      };
    case artistTypes.CLEAR:
      return {
        ...state,
        doc: [],
      };
    case artistTypes.FIND_ALBUMS:
      return {
        ...state,
        loadingAlbums: false,
        albums: payload,
      };
    case artistTypes.FIND_ONE:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case artistTypes.EDITING_NAME:
      return {
        ...state,
        editingName: payload.editingName,
      };
    case artistTypes.LOAD:
      return {
        ...state,
        loading: true,
      };
    case artistTypes.LOAD_ALBUMS:
      return {
        ...state,
        loadingAlbums: true,
      };
    case artistTypes.UPDATE:
      return {
        ...state,
        doc: {
          ...state.doc,
          ...payload,
        },
      };
    default:
      return state;
  }
};
