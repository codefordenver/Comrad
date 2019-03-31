import axios from 'axios';
import {
  ALBUM_FIND_ONE,
  ALBUM_FIND_TRACKS,
  ALBUM_LOAD,
  ALBUM_LOAD_TRACKS,
} from './albumTypes';

export const albumFindTracks = albumId => async dispatch => {
  try {
    dispatch({ type: ALBUM_LOAD_TRACKS });

    const response = await axios.get(`/api/album/${albumId}/tracks`);

    dispatch({ type: ALBUM_FIND_TRACKS, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const albumFindOne = id => async dispatch => {
  try {
    dispatch({ type: ALBUM_LOAD });

    const response = await axios.get(`/api/album/${id}`);

    dispatch({ type: ALBUM_FIND_ONE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
