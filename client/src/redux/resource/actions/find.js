import { resourceAPI } from '../../../api';
import { resourceTypes } from '../resourceTypes';

export const find = category => async dispatch => {
  try {
    dispatch({ type: resourceTypes.LOADING });

    const { data: docs } = await resourceAPI.find(category);

    dispatch({ type: resourceTypes.FIND_ALL, payload: { docs } });
  } catch (err) {
    console.log('Resource Find', err);
  }
};
