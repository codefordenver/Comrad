import axios from 'axios';
import moment from 'moment';
import {
  SHOW_CLEAR,
  SHOW_CLEAR_ALL_INSTANCES_FOR_SERIES,
  SHOW_CLEAR_ONE,
  SHOW_CLEAR_ALL_BUT_PAST_INSTANCES_FOR_SHOW,
  SHOW_FETCHING,
  SHOW_UPDATE,
  SHOW_DELETE,
  SHOW_SEARCH,
  SHOW_ERROR,
  SHOW_SELECTED,
} from './showTypes';
import { ROOT_SHOWS_URL } from '../../api/root';

import { SHOW_DELETE_SERIES } from './showTypes';

import { showAPI } from '../../api';

export const clearAllInstancesForShow = id => async dispatch => {
  dispatch({ type: SHOW_CLEAR_ALL_INSTANCES_FOR_SERIES, payload: id });
};

export const clearShows = () => async dispatch => {
  dispatch({ type: SHOW_CLEAR });
};

export const clearAllButPastInstancesForShow = _id => async dispatch => {
  dispatch({ type: SHOW_CLEAR_ALL_BUT_PAST_INSTANCES_FOR_SHOW, payload: _id });
};

export const postShow = (input, callback) => async dispatch => {
  const show = input;
  try {
    if (show.repeat_rule != null && show.repeat_rule.repeat_end_date != null) {
      //the repeat rule end date is only a date selector, we will adjust this value so the time passed to the back-end is at the end of day rather than the beginning of the day
      let repeatEndDate = moment(show.repeat_rule.repeat_end_date);
      repeatEndDate.endOf('day');
      show.repeat_rule.repeat_end_date = repeatEndDate.toDate();
    }

    const response = await axios.post(`${ROOT_SHOWS_URL}/`, show);

    dispatch({ type: SHOW_UPDATE, payload: response.data });

    callback();
  } catch (e) {
    console.log(e);
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const createInstanceShow = (show_id, data) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT_SHOWS_URL}/${show_id}`, data);
    console.log('response:', response);
    dispatch({ type: SHOW_UPDATE, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const editShow = (show_id, data) => async dispatch => {
  try {
    const response = await axios.put(`${ROOT_SHOWS_URL}/${show_id}`, data);
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
    if (data.repeat_rule != null && data.repeat_rule.repeat_end_date != null) {
      //the repeat rule end date is only a date selector, we will adjust this value so the time passed to the back-end is at the end of day rather than the beginning of the day
      let repeatEndDate = moment(data.repeat_rule.repeat_end_date);
      repeatEndDate.endOf('day');
      data.repeat_rule.repeat_end_date = repeatEndDate.toDate();
    }
    const response = await axios.put(`${ROOT_SHOWS_URL}/${show_id}`, data);
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
    const response = await axios.delete(`${ROOT_SHOWS_URL}/${show}`);
    dispatch({ type: SHOW_DELETE, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const removeInstanceFromSeries = (show_id, data) => async dispatch => {
  try {
    const response = await axios.delete(
      `${ROOT_SHOWS_URL}/${show_id}/remove-instance-from-series/`,
      {
        data,
      },
    );
    dispatch({ type: SHOW_DELETE, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const remove = show => async dispatch => {
  try {
    const response = await axios.delete(`${ROOT_SHOWS_URL}/${show}`);
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
