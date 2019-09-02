import { libraryTypes } from '../libraryTypes';
import { libraryAPI } from '../../../api';

export const findOne = id => async dispatch => {
  try {
    dispatch({ type: libraryTypes.LOAD });

    const { data: libraryEntity } = await libraryAPI.findOne(id);

    const doc = {
      ...libraryEntity,
    };

    dispatch({ type: libraryTypes.FIND_ONE, payload: doc });
  } catch (err) {
    console.log(err);
  }
};
