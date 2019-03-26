import {
  ARTIST_ALERT,
  ARTIST_FIND_ONE,
  ARTIST_EDITING_NAME,
  ARTIST_LOAD,
  ARTIST_UPDATE,
} from './artistTypes';

const initialState = {
  doc: {},
  editingName: false,
  error: null,
  loading: false,
};

export const artistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTIST_ALERT:
      return {
        ...state,
        alert: {
          display: true,
          ...payload,
        },
      };
    case ARTIST_FIND_ONE:
      let dateObj = new Date(payload.updated_at);
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
