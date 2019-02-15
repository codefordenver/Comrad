import axios from 'axios';
import { LIBRARY_LOADING, LIBRARY_SEARCH } from './types';

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
