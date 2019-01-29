import axios from 'axios';
import { LIBRARY_ALL, LIBRARY_LOADING, LIBRARY_SEARCH } from './types';

export const libraryAll = input => async dispatch => {
  try {
    const response = await axios.get(`/api/library`);

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const librarySearch = input => async dispatch => {
  try {
    dispatch({ type: LIBRARY_LOADING });

    const { q } = input;
    let url = `/api/library/search?q=`;

    q && (url += q);

    const response = await axios.get(url);

    dispatch({
      type: LIBRARY_SEARCH,
      payload: { q, docs: [...response.data] },
    });
  } catch (e) {
    console.log(e);
  }
};
