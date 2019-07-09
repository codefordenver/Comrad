import { resourceAPI } from '../../../api';
import { resourceTypes } from '../resourceTypes';

export const findAll = () => async dispatch => {
  try {
    dispatch({ type: resourceTypes.LOADING });

    const { data: docs } = await resourceAPI.findAll();

    dispatch({ type: resourceTypes.FIND_ALL, payload: { docs } });
  } catch (err) {
    console.log('Resource Find All', err);
  }
};
