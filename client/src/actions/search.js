import axios from 'axios';
import { SEARCH_ALL, SEARCH_USERS } from './types';

export const searchAll = searchTerm => async dispatch => {
  try {
    const response = await axios.post('/api/search', { searchTerm });

    dispatch({ type: SEARCH_ALL, payload: response.data });
  } catch (e) {
    console.log(e);
  }
}

export const searchUsers = searchTerm => async dispatch => {
  try {
    const response = await axios.post('/api/search/users', { searchTerm });

    dispatch({ type: SEARCH_USERS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
}