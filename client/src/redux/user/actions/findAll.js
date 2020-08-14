import { userTypes } from '../userTypes';
import { hostGroupAPI } from '../../../api';

export const findAll = () => async dispatch => {
  try {
    dispatch({ type: userTypes.LOAD });

    const { data: docs } = await hostGroupAPI.findAll();

    dispatch({ type: userTypes.FIND_ALL, payload: docs });
  } catch (err) {
    console.log(err);
  }
};
