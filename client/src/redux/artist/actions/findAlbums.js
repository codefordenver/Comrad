import { artistAPI } from '../../../api';
import { artistTypes } from '../artistTypes';

export const findAlbums = artistId => async dispatch => {
  try {
    dispatch({ type: artistTypes.LOAD_ALBUMS });

    const response = await artistAPI.findAlbums(artistId);

    dispatch({ type: artistTypes.FIND_ALBUMS, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
