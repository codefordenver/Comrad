import { libraryTypes } from '../libraryTypes';
import { libraryAPI } from '../../../api';

export const findItunes = collectionId => async dispatch => {
  try {
    dispatch({ type: libraryTypes.LOAD });

    const { data } = await libraryAPI.findItunes(collectionId);

    dispatch({ type: libraryTypes.FIND_ITUNES, payload: data });
  } catch (err) {
    console.log(err);
  }
};
