import { authAPI } from '../../../api';
import { authTypes } from '../authTypes';

export const fetch = () => async dispatch => {
  try {
    dispatch({ type: authTypes.LOADING });

    const { data: doc } = await authAPI.fetch();

    if (doc) {
      //doc will be false if user is not logged in
      dispatch({ type: authTypes.LOGIN, payload: { doc } });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: authTypes.LOGOUT });
  }
};
