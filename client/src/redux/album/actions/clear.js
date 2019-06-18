import { albumTypes } from '../albumTypes';

export const clear = () => async dispatch => {
  try {
    dispatch({ type: albumTypes.CLEAR });
  } catch (err) {
    console.log(err);
  }
};
