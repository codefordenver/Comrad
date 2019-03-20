import axios from 'axios';
import { ARTIST_FIND_ONE, ARTIST_UPDATE } from './artistTypes';

export const artistFindOne = id => async dispatch => {
  try {
    const response = await axios.get(`/api/artist/${id}`);

    dispatch({ type: ARTIST_FIND_ONE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const artistUpdate = (id, name) => async dispatch => {
  try {
    console.log('putting artist');
    await axios.put(`/api/artist/${id}`, {
      name: name,
    });

    dispatch({ type: ARTIST_UPDATE, payload: { name: name } });
  } catch (err) {
    console.log(err);
  }
};
