import _ from 'lodash';
import moment from 'moment';
import {
  SHOW_CLEAR,
  SHOW_CLEAR_ALL_INSTANCES_FOR_SERIES,
  SHOW_CLEAR_ONE,
  SHOW_CLEAR_ALL_BUT_PAST_INSTANCES_FOR_SHOW,
  SHOW_POSTING,
  SHOW_UPDATE,
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
  let newStateData;
  switch (type) {
    case SHOW_CLEAR:
      return {
        ...state,
        data: {},
        fetching: false,
        error: false,
      };

    case SHOW_CLEAR_ONE:
      return {
        ...state,
        selected: {},
      };

    case SHOW_CLEAR_ALL_BUT_PAST_INSTANCES_FOR_SHOW:
      newStateData = state.data;
      let instanceToDeleteFrom = state.data[payload];
      Object.keys(state.data).forEach(function(k) {
        if (
          state.data[k].master_event_id != null &&
          state.data[k].master_event_id._id ===
            instanceToDeleteFrom.master_event_id._id
        ) {
          if (
            state.data[k].start_time_utc >= instanceToDeleteFrom.start_time_utc
          ) {
            delete state.data[k];
          } else if (state.data[k].master_event_id._id === state.data[k]._id) {
            //delete, if not an instance
            delete state.data[k];
          }
        }
      });
      delete state.data[payload];

      return {
        ...state,
        data: { ...newStateData },
      };

    case SHOW_CLEAR_ALL_INSTANCES_FOR_SERIES:
      newStateData = state.data;
      Object.keys(state.data).forEach(function(k) {
        if (
          state.data[k].master_event_id != null &&
          state.data[k].master_event_id._id === payload
        ) {
          delete state.data[k];
        }
      });

      return {
        ...state,
        data: { ...newStateData },
      };
    case SHOW_UPDATE:
      let selected = null;
      if (Array.isArray(payload)) {
        if (payload.length > 0) {
          selected = payload[0];
        }
      } else {
        selected = payload;
      }
      return {
        ...state,
        data: { ...state.data, ..._.keyBy(payload, 'master_time_id') },
        fetching: false,
        error: false,
        selected: selected,
      };

    case SHOW_SEARCH:
      const searchData = payload.data;
      const searchParams = payload.params;
      return {
        ...state,
        data: { ...state.data, ..._.keyBy(searchData, 'master_time_id') },
        fetching: false,
        error: false,
        search: {
          start: searchParams.startDate,
          end: searchParams.endDate,
        },
      };

    case SHOW_DELETE:
      //* Deleting Of Regular Shows Only.
      let deleteShow = { ...state.data };
      delete deleteShow[payload.master_time_id];

      return {
        ...state,
        data: { ...deleteShow },
        fetching: false,
        error: false,
      };

    case SHOW_DELETE_SERIES:
      //* Deleting of Series Shows
      const masterEventToDelete = payload._id;
      const deleteShowSeries = _.reduce(
        state.data,
        function(result, show, key) {
          if (show.master_event_id) {
            //Handles instance and series shows
            if (show.master_event_id._id !== masterEventToDelete) {
              result[key] = show;
            }
            return result;
          } else {
            //Returns all regular shows
            result[key] = show;
            return result;
          }
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

export function showsByTimeSlot(state = initialState) {
  let timeSlots = {};

  if (
    typeof state.data === 'undefined' ||
    state.data === null ||
    Object.values(state.data).length === 0
  ) {
    return timeSlots;
  }

  // order shows by date
  let shows = Object.values(state.data).sort(
    (a, b) => a.start_time_utc > b.start_time_utc,
  );

  var currentShowIndex = 0;
  var currentShow = shows[currentShowIndex];
  var currentDateTime = moment(currentShow.start_time_utc);
  currentDateTime.startOf('day');
  while (currentShowIndex < shows.length) {
    var showName = '';
    if (
      moment(currentShow.start_time_utc) <= currentDateTime &&
      moment(currentShow.end_time_utc) > currentDateTime
    ) {
      showName = currentShow.show_details.title;
    }
    timeSlots[currentDateTime.format('YYYY-MM-DD HH:mm')] = showName;
    currentDateTime.add(10, 'minutes');
    while (moment(currentShow.end_time_utc) <= currentDateTime) {
      currentShowIndex++;
      if (currentShowIndex < shows.length) {
        currentShow = shows[currentShowIndex];
      } else {
        break;
      }
    }
  }
  return timeSlots;
}

export function getShowsData(state = initialState) {
  return state.data;
}

export function getSearchDate(state = initialState) {
  return state.search;
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
