import axios from 'axios';
import { ARTIST_ALL, ARTIST_LOADING } from './types';

export const artistAll = input => async dispatch => {
  try {
    dispatch({ type: ARTIST_LOADING });
    console.log('Test');

    let url = `/api/artist`;

    const response = await axios.get(url);

    dispatch({
      type: ARTIST_ALL,
      payload: { docs: [...response.data] },
    });
  } catch (e) {
    console.log(e);
  }
};
