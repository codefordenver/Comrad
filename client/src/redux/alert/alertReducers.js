import { alertTypes } from './alertTypes';

const initialState = {
  active: false,
  body: '',
  header: '',
  type: '',
};

export const alertReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case alertTypes.ACTIVE:
      return {
        active: true,
        ...payload,
      };

    case alertTypes.INACTIVE:
      return initialState;

    default:
      return state;
  }
};
