import axios from 'axios';
import { SEARCH_LIBRARY, SEARCH_USERS } from './types';

export const searchLibrary = searchTerm => async dispatch => {
  try {
    const response = await axios.post('/api/search/library', { searchTerm });

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
