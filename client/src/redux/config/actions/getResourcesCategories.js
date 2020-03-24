import { configTypes } from '../configTypes';
import { configAPI } from '../../../api';

export const getResourcesCategories = () => async dispatch => {
  try {
    const { data } = await configAPI.getResourcesCategories();

    dispatch({
      type: configTypes.RESOURCES_CATEGORIES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
