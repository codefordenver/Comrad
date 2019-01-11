import _ from 'lodash';
import {
  SHOW_GET,
  SHOW_POST,
  SHOW_POSTING,
  SHOW_UPDATE,
  SHOW_SEARCH,
  SHOW_DELETE,
  SHOW_FETCHING,
  SHOW_ERROR,
} from '../actions/types';

const initialState = {
  data: [],
  fetching: false,
  error: false,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SHOW_GET:
      return {
        ...state,
        data: { ...state.data, ..._.mapKeys([payload], '_id') },
        fetching: false,
        error: false,
      };

    case SHOW_POST:
      return {
        ...state,
        data: { ...state.data, ..._.mapKeys(payload, '_id') },
        posting: false,
        fetching: false,
        error: false,
      };

    case SHOW_SEARCH:
      return {
        ...state,
        data: { ...state.data, ..._.mapKeys(payload, '_id') },
        fetching: false,
        error: false,
      };

    case SHOW_POSTING:
      return {
        ...state,
        posting: true,
      };

    case SHOW_FETCHING:
      return {
        ...state,
        fetching: true,
      };

    case SHOW_UPDATE:
      const { existingShow, updatedShow } = payload;
      const { start, end } = updatedShow;

      const updatedShows = state.map(stateShow => {
        return stateShow.id === existingShow.id
          ? { ...stateShow, start, end }
          : stateShow;
      });

      return {
        ...state,
        data: updatedShows,
        fetching: false,
        error: false,
      };

    //Need some type of error response from server.
    case SHOW_ERROR:
      return {
        ...state,
        fetching: false,
        error: payload,
      };

    default:
      return state;
  }
}

export function getShowsData(state) {
  return state.data;
}

export function fetchingShowsStatus(state) {
  return state.fetching;
}

export function postingShowsStatus(state) {
  return state.posting;
}

export function errorShowsMessage(state) {
  return state.error;
}
