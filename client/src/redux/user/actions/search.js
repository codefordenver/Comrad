import { userTypes } from '../userTypes';
import { userAPI } from '../../../api';

export const search = values => async dispatch => {
  try {
    console.log('Test');
    console.log(values);
    dispatch({ type: userTypes.LOADING });

    const { data: docs } = await userAPI.search(values);

    console.log(docs);

    dispatch({
      type: userTypes.SEARCH,
      payload: { docs },
    });
  } catch (err) {
    console.log(err);
  }
};
