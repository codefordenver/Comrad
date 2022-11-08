import { libraryTypes } from '../libraryTypes';
import { libraryAPI } from '../../../api';

export const searchItunes = (
  q
) => async dispatch => {
  try {
    dispatch({ type: libraryTypes.LOADING_SEARCH_ITUNES });

    let apiResponse = await libraryAPI.searchItunes(q);

    dispatch({
      type: libraryTypes.SEARCH_ITUNES,
      payload: apiResponse.data,
    });

  } catch (err) {
    console.log(err);
    dispatch({ type: libraryTypes.LOADING_ERROR });
  }
};
