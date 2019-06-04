import { albumTypes } from '../albumTypes';
import { albumAPI } from '../../../api';

export const findOne = id => async dispatch => {
  try {
    dispatch({ type: albumTypes.LOAD });

    const { data: album } = await albumAPI.findOne(id);
    const { data: tracks } = await albumAPI.findOneTracks(id);

    const doc = {
      tracks,
      ...album,
    };

    dispatch({ type: albumTypes.FIND_ONE, payload: doc });
  } catch (err) {
    console.log(err);
  }
};
