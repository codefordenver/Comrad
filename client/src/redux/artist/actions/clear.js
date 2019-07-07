import { artistTypes } from '../albumTypes';

export const clear = () => async dispatch => {
  try {
    dispatch({ type: artistTypes.CLEAR });
  } catch (err) {
    console.log(err);
  }
};
