import axios from 'axios';
import { LIBRARY_LOADING, LIBRARY_SEARCH } from './libraryTypes';

export const librarySearch = values => async dispatch => {
  try {
    dispatch({ type: LIBRARY_LOADING });

    const response = await axios.get('/api/library');
    const { data } = response;

    dispatch({
      type: LIBRARY_SEARCH,
      payload: data,
    });
  } catch (e) {
    console.log(e);
  }
};
