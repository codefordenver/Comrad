import axios from 'axios';
import {
  SHOW_GET,
  SHOW_POST,
  SHOW_UPDATE,
  SHOW_DELETE,
  SHOW_SEARCH,
  SHOW_ERROR,
} from './types';

export const getShow = show => async dispatch => {
  try {
    const response = await axios.get(`/api/show/${show}`);

    dispatch({ type: SHOW_GET, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: 'Get Show Error' });
  }
};

export const postShow = show => async dispatch => {
  console.log('Posting Show');
  try {
    const response = await axios.post(`/api/show/`, show);

    dispatch({ type: SHOW_POST, payload: response.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};

export const updateShow = (existingShow, updatedShow) => async dispatch => {
  try {
    console.log('Action: ' + updatedShow);

    dispatch({ type: SHOW_UPDATE, payload: { existingShow, updatedShow } });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: 'Updating Show Error' });
  }
};

export const deleteShow = show => async dispatch => {
  try {
    console.log('Show Delete Action: ' + show);

    dispatch({ type: SHOW_DELETE, payload: show });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: 'Delete Show Error' });
  }
};

export const searchShow = (startDate, endDate) => async dispatch => {
  try {
    console.log(startDate);
    const response = await axios.get(`/api/show/`, {
      params: { startDate, endDate },
    });

    console.log(response.data);

    dispatch({ type: SHOW_SEARCH, payload: response.data });
  } catch (e) {
    dispatch({ type: SHOW_ERROR, payload: e });
  }
};
