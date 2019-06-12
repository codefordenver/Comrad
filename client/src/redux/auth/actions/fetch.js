import { authAPI } from '../../../api';
import { authTypes } from '../authTypes';

export const fetch = () => async dispatch => {
  try {
    dispatch({ type: authTypes.LOADING });

    const { data: doc } = await authAPI.fetch();

    dispatch({ type: authTypes.LOGIN, payload: { doc } });
  } catch (e) {
    console.log(e);
    dispatch({ type: authTypes.LOGOUT });
  }
};
