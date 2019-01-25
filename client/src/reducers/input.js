import {
  INPUT_CLEAR,
  INPUT_UPDATE,
  INPUT_UPDATE_SHOW_TIME,
  INPUT_UPDATE_SHOW_DATE,
} from '../actions/types';

import moment from 'moment';

const initialState = {};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case INPUT_UPDATE:
      return {
        ...state,
        ...payload,
      };

    case INPUT_CLEAR:
      return initialState;

    case INPUT_UPDATE_SHOW_TIME:
      const { timeType, timeValue } = payload;
      return {
        ...state,
        [timeType]: moment(timeValue, 'HH:mm'),
      };

    case INPUT_UPDATE_SHOW_DATE:
      const { dateType, dateValue } = payload;
      return {
        ...state,
        [dateType]: dateValue,
      };

    default:
      return state;
  }
}
