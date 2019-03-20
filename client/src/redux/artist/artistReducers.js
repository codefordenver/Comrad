import {
  ARTIST_ALERT,
  ARTIST_FIND_ONE,
  ARTIST_EDITING_NAME,
} from './artistTypes';

const initialState = {
  alert: {
    display: false,
    header: '',
    text: '',
    type: '',
  },
  doc: {},
  editingName: false,
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
        doc: {
          updated_at_string:
            dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString(),
          ...payload,
        },
      };
    case ARTIST_EDITING_NAME:
      return {
        ...state,
        editingName: payload.editingName,
      };
    default:
      return state;
  }
};
