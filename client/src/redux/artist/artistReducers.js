import { ARTIST_FIND_ONE, ARTIST_UPDATE } from './artistTypes';

const initialState = {
  doc: {},
  docs: [],
  error: false,
  loading: false,
};

export const artistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTIST_FIND_ONE:
      let dateObj = new Date(payload.updated_at);
      return {
        doc: {
          updated_at_string:
            dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString(),
          ...payload,
        },
      };
    case ARTIST_UPDATE:
      return {
        doc: {
          name: payload.name,
        },
      };
    default:
      return state;
  }
};
