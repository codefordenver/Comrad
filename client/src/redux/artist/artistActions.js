import axios from 'axios';
import { SubmissionError } from 'redux-form';

import {
  ARTIST_ALERT,
  ARTIST_ALERT_CLOSE,
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

    const { data: artist } = await axios.get(`/api/artist/${id}`);
    const { data: albums } = await axios.get(`/api/artist/${id}/albums`);

    const doc = {
      albums,
      ...artist,
    };

    return dispatch({
      type: ARTIST_FIND_ONE,
      payload: {
        doc,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const artistUpdate = ({ _id, ...rest }, callback) => async dispatch => {
  try {
    const response = await axios.put(`/api/artist/${_id}`, rest);

    dispatch({ type: ARTIST_UPDATE, payload: response.data });

    callback();
  } catch (err) {
    dispatch({
      type: ARTIST_ALERT,
      payload: {
        header: 'Error',
        message: 'Artist Update Did Not Succeed',
        type: 'danger',
      },
    });
    throw new SubmissionError({});
  }
};

export const changeEditingArtistName = value => async dispatch => {
  dispatch({ type: ARTIST_EDITING_NAME, payload: { editingName: value } });
};

export const artistAlertClose = () => async dispatch => {
  try {
    dispatch({ type: ARTIST_ALERT_CLOSE });
  } catch (err) {
    console.log(err);
  }
};
