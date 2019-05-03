import _ from 'lodash';
import {
  SHOW_GET,
  SHOW_POST,
  SHOW_POSTING,
  SHOW_UPDATE,
  SHOW_UPDATE_HOST,
  SHOW_SEARCH,
  SHOW_DELETE,
  SHOW_DELETE_SERIES,
  SHOW_FETCHING,
  SHOW_ERROR,
  SHOW_SELECTED,
} from './showTypes';

const initialState = {
  data: [],
  fetching: false,
  error: false,
  search: {},
};

export function showReducer(state = initialState, { type, payload }) {
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
      const searchData = payload.data;
      const searchParams = payload.params;
      return {
        ...state,
        data: { ...state.data, ..._.mapKeys(searchData, '_id') },
        fetching: false,
        error: false,
        search: {
          start: searchParams.startDate,
          end: searchParams.endDate,
        },
      };

    case SHOW_DELETE:
      let deleteShow = { ...state.data };

      delete deleteShow[payload._id];

      return {
        ...state,
        data: { ...deleteShow },
        fetching: false,
        error: false,
      };

    case SHOW_DELETE_SERIES:
      const masterShowID = payload._id;

      const deleteShowSeries = _.reduce(
        state.data,
        function(result, show, key) {
          if (show.master_show_uid !== masterShowID) {
            result[key] = show;
          }
          return result;
        },
        {},
      );

      return {
        ...state,
        data: { ...deleteShowSeries },
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
      // const { existingShow, updatedShow } = payload;
      // const { start, end } = updatedShow;

      // const updatedShows = state.map(stateShow => {
      //   return stateShow.id === existingShow.id
      //     ? { ...stateShow, start, end }
      //     : stateShow;
      // });

      return {
        ...state,
        fetching: false,
        error: false,
      };

    case SHOW_UPDATE_HOST:
      return {
        ...state,
        data: { ...state.data, [payload._id]: payload },
        fetching: false,
        error: false,
      };

    case SHOW_SELECTED:
      return {
        ...state,
        selected: payload,
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

export function getShowsData(state = initialState) {
  return state.data;
}

export function getSearchDate(state = initialState) {
  return state.search;
}

export function getShowSelected(state = initialState) {
  return state.selected;
}

export function fetchingShowsStatus(state = initialState) {
  return state.fetching;
}

export function postingShowsStatus(state = initialState) {
  return state.posting;
}

export function errorShowsMessage(state = initialState) {
  return state.error;
}
