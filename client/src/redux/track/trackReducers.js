import { TRACK_ADD } from './trackTypes';

const initialState = {
  tracks: [],
  doc: {},
  error: null,
  loading: false,
};

export const trackReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TRACK_ADD:
      return {
        doc: {
          ...payload,
        },
      };

    default:
      return state;
  }
};
