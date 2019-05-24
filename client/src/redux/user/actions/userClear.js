import { userTypes } from '../userTypes';

export const userClear = () => async dispatch => {
  try {
    dispatch({ type: userTypes.CLEAR });
  } catch (e) {
    console.log(e);
  }
};
