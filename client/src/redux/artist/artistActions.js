import axios from 'axios';
import {
  ARTIST_ALERT,
  ARTIST_FIND_ONE,
  ARTIST_EDITING_NAME,
  ARTIST_LOAD,
  ARTIST_UPDATE,
} from './artistTypes';

export const artistFindOne = id => async dispatch => {
  try {
    dispatch({ type: ARTIST_LOAD });

    const response = await axios.get(`/api/artist/${id}`);

    dispatch({ type: ARTIST_FIND_ONE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const artistUpdate = ({ _id, ...rest }) => async dispatch => {
  try {
    const response = await axios.put(`/api/artist/${_id}`, rest);

    dispatch({ type: ARTIST_UPDATE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const changeEditingArtistName = value => async dispatch => {
  dispatch({ type: ARTIST_EDITING_NAME, payload: { editingName: value } });
};
