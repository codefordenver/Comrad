import { libraryTypes } from '../libraryTypes';

export const clear = () => async dispatch => {
  try {
    dispatch({ type: libraryTypes.CLEAR });
  } catch (err) {
    console.log(err);
  }
};
