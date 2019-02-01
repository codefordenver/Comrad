import {
  INPUT_CLEAR,
  INPUT_UPDATE,
  INPUT_UPDATE_SHOW_TIME,
  INPUT_UPDATE_SHOW_DATE,
  INPUT_UPDATE_SHOW_REPEAT_CHECKBOX,
} from './types';

/**
 * Regular Form Actions
 */
export const inputClear = name => async dispatch => {
  try {
    dispatch({ type: INPUT_CLEAR, payload: name });
  } catch (e) {
    console.error(e);
  }
};

export const inputUpdate = value => async dispatch => {
  try {
    dispatch({ type: INPUT_UPDATE, payload: value });
  } catch (e) {
    console.error(e);
  }
};

/**
 * Special Show Form Actions
 */
export const inputUpdateShowTime = (timeType, timeValue) => async dispatch => {
  try {
    dispatch({
      type: INPUT_UPDATE_SHOW_TIME,
      payload: { timeType, timeValue },
    });
  } catch (e) {
    console.error(e);
  }
};

export const inputUpdateShowDate = (dateType, dateValue) => async dispatch => {
  try {
    dispatch({
      type: INPUT_UPDATE_SHOW_DATE,
      payload: { dateType, dateValue },
    });
  } catch (e) {
    console.error(e);
  }
};

export const inputUpdateShowRepeatCheckbox = value => async dispatch => {
  try {
    console.log('Repeat Payload');
    console.log(value);

    dispatch({ type: INPUT_UPDATE_SHOW_REPEAT_CHECKBOX, payload: value });
  } catch (e) {
    console.error(e);
  }
};
