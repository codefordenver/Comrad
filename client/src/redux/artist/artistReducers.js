import { ARTIST_FIND_ONE } from './artistTypes';

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
    default:
      return state;
  }
};
