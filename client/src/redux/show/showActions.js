import axios from 'axios';
import {
  SHOW_CLEAR,
  SHOW_CLEAR_ONE,
  SHOW_CLEAR_ALL_BUT_PAST_INSTANCES_FOR_SHOW,
  SHOW_FETCHING,
  SHOW_UPDATE,
  SHOW_DELETE,
  SHOW_SEARCH,
  SHOW_ERROR,
  SHOW_SELECTED,
} from './showTypes';

import { SHOW_DELETE_SERIES } from './showTypes';

import { showAPI } from '../../api';

export const clearShows = () => async dispatch => {
  dispatch({ type: SHOW_CLEAR });
};

export const clearAllButPastInstancesForShow = _id => async dispatch => {
  dispatch({ type: SHOW_CLEAR_ALL_BUT_PAST_INSTANCES_FOR_SHOW, payload: _id });
};

export const postShow = (input, callback) => async dispatch => {
  const show = input;
  try {
    const response = await axios.post(`/v1/events/shows/`, show);

    dispatch({ type: SHOW_UPDATE, payload: response.data });

    callback();
  } catch (e) {
    console.log(e);
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const createInstanceShow = (show_id, data) => async dispatch => {
  try {
    const response = await axios.put(`/v1/events/shows/${show_id}`, data);
    dispatch({ type: SHOW_UPDATE, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const createInstanceAndEditShow = (show_id, data) => async dispatch => {
  try {
    const response = await axios.put(`/v1/events/shows/${show_id}`, data);
    dispatch({ type: SHOW_UPDATE, payload: response.data });
    const returnedShow = response.data[0];
    dispatch(selectShow(returnedShow));
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const updateShow = (
  show_id,
  data,
  callback = null,
) => async dispatch => {
  try {
    const response = await axios.patch(`/v1/events/shows/${show_id}`, data);
    dispatch({ type: SHOW_UPDATE, payload: response.data });
    if (callback) {
      callback();
    }
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const updateSeries = (
  show_id,
  data,
  callback = null,
) => async dispatch => {
  try {
    const response = await axios.patch(
      `/v1/events/shows/series/${show_id}`,
      data,
    );
    dispatch({ type: SHOW_UPDATE, payload: response.data });
    if (callback) {
      callback();
    }
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const deleteShow = show => async dispatch => {
  try {
    const response = await axios.delete(`/v1/events/shows/${show}`);
    dispatch({ type: SHOW_DELETE, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const deleteShowInstance = (show_id, data) => async dispatch => {
  try {
    const response = await axios.delete(
      `/v1/events/shows/instance/${show_id}`,
      {
        data,
      },
    );
    dispatch({ type: SHOW_DELETE, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const deleteShowSeries = show => async dispatch => {
  try {
    const response = await axios.delete(`/v1/events/shows/series/${show}`);
    dispatch({ type: SHOW_DELETE_SERIES, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const clearShow = () => async dispatch => {
  try {
    dispatch({ type: SHOW_CLEAR_ONE });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const searchShow = (
  startDate,
  endDate,
  host = null,
  onlyDisplayShowsWithNoHost = false,
) => async dispatch => {
  try {
    dispatch({ type: SHOW_FETCHING });

    const response = await showAPI.find(
      startDate,
      endDate,
      host,
      onlyDisplayShowsWithNoHost,
    );

    dispatch({
      type: SHOW_SEARCH,
      payload: { data: response.data, params: { startDate, endDate } },
    });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const selectShow = show => async dispatch => {
  try {
    dispatch({ type: SHOW_SELECTED, payload: show });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};
