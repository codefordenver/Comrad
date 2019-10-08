import { userTypes } from '../userTypes';
import { alertTypes } from '../../alert/alertTypes';
import { userAPI } from '../../../api';

export const remove = (values, callback) => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });

    const { data: doc } = await userAPI.remove(values);

    callback();

    const alert = {
      body: `User ${doc.first_name} ${doc.last_name} was removed`,
      header: 'Success',
      type: 'success',
    };

    dispatch({ type: alertTypes.ACTIVE, payload: alert });
  } catch (err) {
    console.log(err);
    dispatch({ type: alertTypes.ACTIVE, payload: { body: err.message } });
  }
};
