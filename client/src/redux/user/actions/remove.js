import { userTypes } from '../userTypes';
import { alertTypes } from '../../alert/alertTypes';
import { userAPI } from '../../../api';

export const remove = (id, callback) => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });

    const { data: doc } = await userAPI.remove(id);

    callback();
    dispatch({ type: userTypes.REMOVE, payload: doc });
  } catch (err) {
    console.log(err);
    dispatch({ type: alertTypes.ACTIVE, payload: { body: err.message } });
  }
};
