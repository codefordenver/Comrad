import axios from 'axios';
import {
  ARTIST_ALERT,
  ARTIST_FIND_ONE,
  ARTIST_EDITING_NAME,
} from './artistTypes';

export const artistFindOne = id => async dispatch => {
  try {
    const response = await axios.get(`/api/artist/${id}`);

    dispatch({ type: ARTIST_FIND_ONE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const artistUpdate = (id, name, callback) => async dispatch => {
  try {
    const response = await axios.put(`/api/artist/${id}`, {
      name: name,
    });

    dispatch({ type: ARTIST_FIND_ONE, payload: response.data });

    callback();
  } catch (err) {
    console.log(err);
    dispatch({
      type: ARTIST_ALERT,
      payload: { type: 'danger', text: err.response.data.errorMessage },
    });
  }
};

export const changeEditingArtistName = value => async dispatch => {
  dispatch({ type: ARTIST_EDITING_NAME, payload: { editingName: value } });
};
