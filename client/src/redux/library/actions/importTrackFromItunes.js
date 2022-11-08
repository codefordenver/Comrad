import { libraryTypes } from '../libraryTypes';
import { libraryAPI } from '../../../api';

export const importTrackFromItunes = (track, callback) => async dispatch => {
  try {
    dispatch({ type: libraryTypes.LOAD });

    const { data } = await libraryAPI.importTrackFromItunes(track);

    if (typeof callback == 'function') {
      callback(data);
    }

    dispatch({ type: libraryTypes.LOAD_COMPLETE });
  } catch (err) {
    console.log(err);
  }
};
