import {
  INPUT_CLEAR,
  INPUT_UPDATE,
  INPUT_UPDATE_SHOW_REPEAT_CHECKBOX,
  INPUT_UPDATE_SHOW_TIME,
  INPUT_UPDATE_SHOW_DATE,
} from '../actions/types';

import moment from 'moment';

const initialState = {};

function updateTime(date, time) {
  if (moment(time).isValid()) {
    const newHours = moment(time).hour();
    const newMinutes = moment(time).minute();

    const newTime = moment(date)
      .hours(newHours)
      .minutes(newMinutes)
      .format();

    return newTime;
  }

  return null;
}

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
        [timeType]: moment(timeValue),
      };

    case INPUT_UPDATE_SHOW_DATE:
      const { dateType, dateValue } = payload;
      let { show_start_time_utc, show_end_time_utc } = state;

      if (dateType === 'repeat_start_date') {
        show_start_time_utc = updateTime(dateValue, show_start_time_utc);
        show_end_time_utc = updateTime(dateValue, show_end_time_utc);
      }

      return {
        ...state,
        [dateType]: dateValue,
        show_start_time_utc: show_start_time_utc,
        show_end_time_utc: show_end_time_utc,
      };

    case INPUT_UPDATE_SHOW_REPEAT_CHECKBOX:
      let { repeat_start_date, repeat_end_date, repeatType } = state;

      if (!payload.repeat) {
        repeat_end_date = repeat_start_date;
        repeatType = null;
      }

      return {
        ...state,
        ...payload,
        repeat_end_date: repeat_end_date,
        repeatType: repeatType,
      };

    default:
      return state;
  }
}
