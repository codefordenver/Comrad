import axios from 'axios';
import { TRACK_ADD } from './trackTypes';

export const trackAdd = (input, callback, id) => async dispatch => {
  try {
    const response = await axios.post(`/v1/tracks`, input);
    dispatch({ type: TRACK_ADD, payload: response.data });
    callback(response.data._id);
  } catch (e) {
    console.error(e);
  }
};
