import axios from 'axios';
import {
  SHOW_CLEAR,
  SHOW_GET,
  SHOW_POST,
  SHOW_UPDATE_HOST,
  SHOW_DELETE,
  SHOW_DELETE_SERIES,
  SHOW_SEARCH,
  SHOW_ERROR,
  SHOW_SELECTED,
  SHOW_CREATE_INSTANCE,
} from './showTypes';

export const clearShows = () => async dispatch => {
  dispatch({ type: SHOW_CLEAR });
};

export const getShow = show => async dispatch => {
  try {
    const response = await axios.get(`/v1/shows/${show}`);

    dispatch({ type: SHOW_GET, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: 'Get Show Error' });
  }
};

export const postShow = (input, callback) => async dispatch => {
  const show = input;
  try {
    const response = await axios.post(`/v1/shows/`, show);

    dispatch({ type: SHOW_POST, payload: response.data });

    callback();
  } catch (e) {
    console.log(e);
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const createInstanceShow = (show_id, data) => async dispatch => {
  try {
    const response = await axios.put(`/v1/shows/${show_id}`, data);
    dispatch({ type: SHOW_CREATE_INSTANCE, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: 'Updating Show Error' });
  }
};

export const updateShow = (show_id, data) => async dispatch => {
  try {
    const response = await axios.patch(`/v1/shows/${show_id}`, data);
    dispatch({ type: SHOW_UPDATE_HOST, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: 'Updating Show Error' });
  }
};

export const deleteShow = show => async dispatch => {
  try {
    const response = await axios.delete(`/v1/shows/${show}`);
    dispatch({ type: SHOW_DELETE, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const deleteShowSeries = show => async dispatch => {
  try {
    const response = await axios.delete(`/v1/shows/${show}`);
    dispatch({ type: SHOW_DELETE_SERIES, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const searchShow = (
  startDate,
  endDate,
  host,
  onlyDisplayShowsWithNoHost,
) => async dispatch => {
  const params = { startDate, endDate };
  if (host != null) {
    params.host = host;
  }
  if (onlyDisplayShowsWithNoHost) {
    params.showsWithNoHost = true;
  }
  try {
    const response = await axios.get(`/v1/shows/`, {
      params: params,
    });

    dispatch({
      type: SHOW_SEARCH,
      payload: { data: response.data, params: params },
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
