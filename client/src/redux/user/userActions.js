import axios from 'axios';
import {
  HOST_SEARCH,
  USER_ALERT,
  USER_ALERT_CLOSE,
  USER_CLEAR,
  USER_CREATE,
  USER_FIND_ALL,
  USER_FIND_ONE,
  USER_LOADING,
  USER_SEARCH,
} from './userTypes';

import { userAPI } from '../../api';

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
    dispatch({ type: USER_LOADING });

    const response = await userAPI.findOne(id);

    dispatch({ type: USER_FIND_ONE, payload: response.data });
  } catch (err) {
    const alert = {
      display: true,
      header: 'Error',
      message: 'User was not found',
      type: 'danger',
    };

    dispatch({
      type: USER_ALERT,
      payload: alert,
    });
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

    dispatch({ type: USER_ALERT, payload: alert });
  }
};

export const userClear = () => async dispatch => {
  try {
    dispatch({ type: USER_CLEAR });
  } catch (e) {
    console.log(e);
  }
};

export const userAlertClose = () => async dispatch => {
  try {
    dispatch({ type: USER_ALERT_CLOSE });
  } catch (err) {
    console.log(err);
  }
};

export const userCreate = (values, callback) => async dispatch => {
  try {
    dispatch({ type: USER_LOADING });

    const response = await userAPI.create(values);

    const payload = {
      doc: response,
      alert: {
        display: true,
        header: 'SUCCESS',
        message: 'User successfully created!',
        type: 'success',
      },
    };

    callback();

    dispatch({ type: USER_CREATE, payload });
  } catch (err) {
    console.log(err);
    const alert = {
      display: true,
      header: 'ERROR',
      message: 'Create User Fail',
      type: 'danger',
    };

    dispatch({ type: USER_ALERT, payload: alert });
  }
};
