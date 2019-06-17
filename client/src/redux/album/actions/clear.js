import { albumTypes } from '../albumTypes';

export const clear = () => async dispatch => {
  try {
    console.log('clear');
    dispatch({ type: albumTypes.CLEAR });
  } catch (err) {
    console.log(err);
  }
};
