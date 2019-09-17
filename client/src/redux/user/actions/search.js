import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';

export const search = values => async dispatch => {
  try {
    dispatch({ type: userTypes.LOADING });

    const { data: docs } = await userAPI.search(values);

    dispatch({
      type: userTypes.SEARCH,
      payload: { docs },
    });
  } catch (err) {
    console.log(err);
  }
};
