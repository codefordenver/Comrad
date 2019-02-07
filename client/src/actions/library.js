import axios from 'axios';
import { LIBRARY_LOADING, LIBRARY_SEARCH } from './types';

export const libraryGetAll = input => async dispatch => {
  try {
    dispatch({ type: LIBRARY_LOADING }); //TODO: what is this for?
    console.log('Test getting all for library');

    let url = `/api/library`;

    const response = await axios.get(url);
    
    dispatch({
      type: LIBRARY_SEARCH,
      payload: { 
        docs: response.data.results,
        totalPages: response.data.totalPages,
        nextPage: response.data.nextPage,
      },
    });
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
