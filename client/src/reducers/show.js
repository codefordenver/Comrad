import {
  SHOW_GET,
  SHOW_POST,
  SHOW_UPDATE,
  // SHOW_DELETE,
  SHOW_ERROR,
} from '../actions/types';

const initialState = [
  {
    id: 0,
    title: 'Show 1',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'Show 2',
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 1,
  },
  {
    id: 2,
    title: 'Show 3',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 1,
  },
  {
    id: 11,
    title: 'Show 4',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 1,
  },
];

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SHOW_GET:
      return {
        payload,
      };

    case SHOW_POST:
      const updatedState = state.concat(payload);
      return updatedState;

    case SHOW_UPDATE:
      const { existingShow, updatedShow } = payload;
      const { start, end } = updatedShow;

      const nextShows = state.map(stateShow => {
        return stateShow.id === existingShow.id
          ? { ...stateShow, start, end }
          : stateShow;
      });
      return nextShows;

    //Need some type of error response from server.
    case SHOW_ERROR:
      return {
        status: 'ERROR',
        errorMessage: payload,
      };

    default:
      return state;
  }
}
