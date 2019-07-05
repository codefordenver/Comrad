import { permissionTypes } from '../permissionTypes';
import { permissionAPI } from '../../../api';

export const findAll = () => async dispatch => {
  try {
    dispatch({ type: permissionTypes.LOADING });

    const { data: docs } = await permissionAPI.findAll();

    dispatch({ type: permissionTypes.FIND_ALL, payload: { docs } });
  } catch (err) {
    console.log('Permission Find All Error: ', err);
  }
};
