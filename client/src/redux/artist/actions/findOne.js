import { artistAPI } from '../../../api';
import { artistTypes } from '../artistTypes';

export const findOne = id => async dispatch => {
  try {
    dispatch({ type: artistTypes.LOAD });

    const { data: artist } = await artistAPI.findOne(id);
    const { data: albums } = await artistAPI.findAlbums(id);

    const doc = {
      albums,
      ...artist,
    };

    return dispatch({
      type: artistTypes.FIND_ONE,
      payload: {
        doc,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
