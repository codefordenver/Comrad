import axios from 'axios';
import { ARTIST_FIND_ONE } from './artistTypes';

export const artistFindOne = id => async dispatch => {
  try {
    const response = await axios.get(`/api/artist/${id}`);

    dispatch({ type: ARTIST_FIND_ONE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
