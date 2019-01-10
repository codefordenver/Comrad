import axios from 'axios';
import { INPUT_CLEAR, USERS_UPDATE } from './types';

export const usersAll = input => async dispatch => {
  try {
    const response = await axios.get(`/api/user`);

    console.log(response);
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

    console.log(q);

    const response = await axios.get(url);

    dispatch({ type: USERS_UPDATE, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};
