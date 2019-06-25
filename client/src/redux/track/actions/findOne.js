import { trackTypes } from '../trackTypes';
import { trackAPI } from '../../../api';

export const findOne = id => async dispatch => {
  try {
    dispatch({ type: trackTypes.LOAD });

    const { data: track } = await trackAPI.findOne(id);

    dispatch({ type: trackTypes.FIND_ONE, payload: track });
  } catch (err) {
    console.log(err);
  }
};
