import axios from 'axios';
import { USERS_CLEAR, USERS_UPDATE } from './types';

export const usersAll = input => async dispatch => {
  try {
    const response = await axios.get(`/api/user`);

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const usersClear = () => async dispatch => {
  try {
    dispatch({ type: USERS_CLEAR });
  } catch (e) {
    console.log(e);
  }
};

export const usersSearch = (input, options = {}) => async dispatch => {
  try {
    const { q } = input;
    const { limit, order, page, sort } = options;

    let url = `/api/user/search?`;

    q && (url += `&q=${q}`);
    limit && (url += `&limit=${limit}`);
    order && (url += `&order=${order}`);
    page && (url += `&page=${page}`);
    sort && (url += `&sort=${sort}`);

    const response = await axios.get(url);

    dispatch({ type: USERS_UPDATE, payload: { q, ...response.data } });
  } catch (e) {
    console.log(e);
  }
};
