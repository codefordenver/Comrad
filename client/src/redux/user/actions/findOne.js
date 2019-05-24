import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';

export const findOne = id => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });

    const { data: doc } = await userAPI.findOne(id);

    dispatch({ type: userTypes.FIND_ONE, payload: doc });
  } catch (err) {
    console.log(err);
  }
};
