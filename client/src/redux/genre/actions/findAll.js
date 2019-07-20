import { genreTypes } from '../genreTypes';
import { genreAPI } from '../../../api';

export const findAll = () => async dispatch => {
  try {
    const { data: docs } = await genreAPI.findAll();

    dispatch({ type: genreTypes.FIND_ALL, payload: docs });
  } catch (err) {
    console.log(err);
  }
};
