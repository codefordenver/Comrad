import { libraryAPI } from '../../../api';
import { libraryTypes } from '../libraryTypes';
import { alertTypes } from '../../alert';

export const update = (data, callback) => async dispatch => {
  try {
    const _id = data.id;
    const libraryEntity = await libraryAPI.update(data, _id);
    dispatch({ type: libraryTypes.UPDATE, payload: libraryEntity.data });
    callback(data);
  } catch (e) {
    console.error(e);
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
