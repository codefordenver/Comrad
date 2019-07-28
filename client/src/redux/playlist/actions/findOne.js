import { playlistTypes } from '../playlistTypes';
import { playlistAPI } from '../../../api';

export const findOne = (startTime, endTime) => async dispatch => {
  try {
    dispatch({ type: playlistTypes.LOADING });

    const doc = await playlistAPI.findOne(startTime, endTime);

    dispatch({ type: playlistTypes.FIND_ONE, payload: doc.data });
  } catch (err) {
    console.log('Playlist Find One Error: ', err);
  }
};
