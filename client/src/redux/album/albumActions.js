import axios from 'axios';
import { ALBUM_FIND_ONE, ALBUM_LOAD } from './albumTypes';

export const albumFindOne = id => async dispatch => {
  try {
    dispatch({ type: ALBUM_LOAD });

    const { data: album } = await axios.get(`/api/album/${id}`);
    const { data: tracks } = await axios.get(`/api/album/${id}/tracks`);

    const doc = {
      tracks,
      ...album,
    };

    dispatch({ type: ALBUM_FIND_ONE, payload: doc });
  } catch (err) {
    console.log(err);
  }
};
