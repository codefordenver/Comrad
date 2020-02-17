import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const update = (values, callback) => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });
    const { data: doc } = await userAPI.update(values, values._id);

    if (typeof callback === 'function') {
      callback(doc);
    }

    dispatch({ type: userTypes.UPDATE, payload: { doc } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        type: 'danger',
        header: 'Error',
        body: err.response.data.errorMessage,
      },
    });
  }
};
