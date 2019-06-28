import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';

export const create = (values, callback) => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });
    console.log('creating data');
    const { data: doc } = await userAPI.create(values);
    const alert = {
      display: true,
      header: 'SUCCESS',
      message: 'User successfully created!',
      type: 'success',
    };

    callback(doc);

    dispatch({ type: userTypes.CREATE, payload: { alert, doc } });
  } catch (err) {
    console.log(err);
  }
};
