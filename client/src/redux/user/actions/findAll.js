import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';

export const findAll = () => async dispatch => {
  try {
    dispatch({ type: userTypes.LOAD });

    const { data: docs } = await userAPI.findAll();

    dispatch({ type: userTypes.FIND_ALL, payload: docs });
  } catch (err) {
    console.log(err);
  }
};
