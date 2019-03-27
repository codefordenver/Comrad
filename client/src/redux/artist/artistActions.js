import axios from 'axios';
import {
  ARTIST_ALERT,
  ARTIST_FIND_ALBUMS,
  ARTIST_FIND_ONE,
  ARTIST_EDITING_NAME,
  ARTIST_LOAD,
  ARTIST_LOAD_ALBUMS,
  ARTIST_UPDATE,
} from './artistTypes';

export const artistFindAlbums = artistId => async dispatch => {
  try {
    dispatch({ type: ARTIST_LOAD_ALBUMS });

    const response = await axios.get(`/api/artist/${artistId}/albums`);

    dispatch({ type: ARTIST_FIND_ALBUMS, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const artistFindOne = id => async dispatch => {
  try {
    dispatch({ type: ARTIST_LOAD });

    const response = await axios.get(`/api/artist/${id}`);

    dispatch({ type: ARTIST_FIND_ONE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const artistUpdate = ({ _id, ...rest }, callback) => async dispatch => {
  try {
    dispatch({ type: ARTIST_LOAD });

    const response = await axios.put(`/api/artist/${_id}`, rest);

    dispatch({ type: ARTIST_UPDATE, payload: response.data });

    callback();
  } catch (err) {
    console.log(err);
  }
};

export const changeEditingArtistName = value => async dispatch => {
  dispatch({ type: ARTIST_EDITING_NAME, payload: { editingName: value } });
};
