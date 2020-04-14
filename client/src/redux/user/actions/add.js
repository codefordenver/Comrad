import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const add = (values, callback) => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });

    const { data: doc } = await userAPI.add(values);

    dispatch({ type: userTypes.ADD, payload: { doc } });

    callback();

    const alert = {
      body: `User ${doc.first_name} ${doc.last_name} was added`,
      header: 'Success',
      type: 'success',
    };

    dispatch({ type: alertTypes.ACTIVE, payload: alert });
  } catch (err) {
    console.log('User Add', err);
  }
};
