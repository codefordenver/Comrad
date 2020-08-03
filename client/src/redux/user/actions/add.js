import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const add = (values, callback, hideAlert) => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });

    const doc = await userAPI.add(values);

    dispatch({ type: userTypes.ADD, payload: { doc } });

    callback(doc);

    if (hideAlert) {
      return;
    }

    const alert = {
      body: `User ${doc.first_name} ${doc.last_name} was added`,
      header: 'Success',
      type: 'success',
    };

    dispatch({ type: alertTypes.ACTIVE, payload: alert });
  } catch (e) {
    console.log('User Add', e);
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        type: 'danger',
        header: 'Error',
        body: e.response.data.errorMessage,
      },
    });
  }
};
