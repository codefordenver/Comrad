import { libraryTypes } from '../libraryTypes';
import { libraryAPI } from '../../../api';

export const importFromItunes = ({ collectionId, callback }) => async dispatch => {
  try {
    dispatch({ type: libraryTypes.LOAD });

    const { data } = await libraryAPI.importFromItunes(collectionId);

    if (typeof callback == 'function') {
      callback(data);
    }
  } catch (err) {
    console.log(err);
  }
};
