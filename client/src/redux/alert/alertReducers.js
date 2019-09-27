import { alertTypes } from './alertTypes';

const initialState = {
  active: false,
  body: '',
  displayAt: 'main', // either "main" or "modal", this determines the render location for the alert. This will reset whenever alertTypes.INACTIVE is dispatched
  header: '',
  type: '',
};

export const alertReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case alertTypes.ACTIVE:
      console.log(payload);
      return {
        ...state,
        active: true,
        ...payload,
      };

    case alertTypes.CHANGE_DISPLAY_LOCATION:
      return {
        ...state,
        displayAt: payload,
      };

    case alertTypes.INACTIVE:
      return initialState;

    case alertTypes.INACTIVE_DONT_CHANGE_DISPLAY_LOCATION:
      return {
        ...initialState,
        displayAt: state.displayAt,
      };

    default:
      return state;
  }
};
