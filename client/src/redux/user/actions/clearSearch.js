import { userTypes } from '../userTypes';

export const clearSearch = () => async dispatch => {
  try {
    dispatch({ type: userTypes.CLEAR_SEARCH });
  } catch (err) {
    console.log(err);
  }
};
