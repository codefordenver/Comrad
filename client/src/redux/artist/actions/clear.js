import { artistTypes } from '../artistTypes';

export const clear = () => async dispatch => {
  try {
    dispatch({ type: artistTypes.CLEAR });
  } catch (err) {
    console.log(err);
  }
};
