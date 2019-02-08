import axios from 'axios';
import { SEARCH_LOADING, SEARCH_LIBRARY, SEARCH_USERS } from './types';

export const searchUsers = searchTerm => async dispatch => {
  try {
    const response = await axios.post('/api/search/users', { searchTerm });

    dispatch({ type: SEARCH_USERS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};
