import axios from 'axios';
import { SEARCH_LOADING, SEARCH_LIBRARY, SEARCH_USERS } from './types';

export const searchLibrary = input => async dispatch => {
  try {
    const { search } = input;

    dispatch({ type: SEARCH_LOADING });
    const response = await axios.get(`/api/search/library?s=${search}`);

    dispatch({ type: SEARCH_LIBRARY, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const searchUsers = searchTerm => async dispatch => {
  try {
    const response = await axios.post('/api/search/users', { searchTerm });

    dispatch({ type: SEARCH_USERS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};
