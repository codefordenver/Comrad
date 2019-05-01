import axios from 'axios';
import {
  HOST_SEARCH,
  USER_ALERT,
  USER_ALERT_CLOSE,
  USER_FIND_ONE,
  USER_ADD,
  USER_LOADING,
  USER_FIND_ALL,
  USER_SEARCH,
  USER_CLEAR,
} from './userTypes';

import { userAPI } from '../../utils/api';

export const hostSearch = ({ filter, q }) => async dispatch => {
  try {
    dispatch({ type: USER_LOADING });

    const { data: docs } = await userAPI.searchHosts({ filter, q });
    const search = { filter, q };

    dispatch({ type: HOST_SEARCH, payload: { docs, search } });
  } catch (e) {
    const alert = {
      display: true,
      header: 'ERROR',
      message: 'Error With Searching For Users',
      type: 'danger',
    };

    dispatch({ type: USER_ALERT, payload: { alert } });
  }
};

export const userFindOne = id => async dispatch => {
  try {
    const response = await axios.get(`/v1/users/${id}`);

    dispatch({ type: USER_FIND_ONE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const userFindAll = () => async dispatch => {
  try {
    dispatch({ type: USER_LOADING });

    const response = await axios.get(`/v1/users`);

    const { data: docs } = response;

    dispatch({
      type: USER_FIND_ALL,
      payload: {
        docs,
      },
    });
  } catch (err) {
    dispatch({
      type: USER_ALERT,
      payload: {
        header: 'Error',
        text: 'There was an error loading all users',
        type: 'danger',
      },
    });
  }
};

export const userSearch = ({ filter, q }) => async dispatch => {
  try {
    dispatch({ type: USER_LOADING });

    const { data: docs } = await userAPI.search({ filter, q });
    const search = { filter, q };

    dispatch({ type: USER_SEARCH, payload: { docs, search } });
  } catch (e) {
    const alert = {
      display: true,
      header: 'ERROR',
      message: 'Error With Searching For Users',
      type: 'danger',
    };

    dispatch({ type: USER_ALERT, payload: { alert } });
  }
};

export const userAdd = (input, callback) => async dispatch => {
  try {
    const response = await axios.post('/v1/users', input);

    dispatch({ type: USER_ADD, payload: response.data });

    callback();
  } catch (e) {
    dispatch({
      type: USER_ALERT,
      payload: { type: 'error', text: e.response.data.errorMessage },
    });
  }
};

export const userClear = () => async dispatch => {
  try {
    dispatch({ type: USER_CLEAR });
  } catch (err) {
    console.log(err);
  }
};

export const userAlertClose = () => async dispatch => {
  try {
    dispatch({ type: USER_ALERT_CLOSE });
  } catch (err) {
    console.log(err);
  }
};
