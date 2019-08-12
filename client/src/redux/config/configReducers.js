import { configTypes } from './configTypes';

const initialState = {
  customFields: {},
};

export const configReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case configTypes.CUSTOM_FIELDS_FOR_MODEL:
      return {
        ...state,
        customFields: {
          ...state.customFields,
          ...payload,
        },
      };

    default:
      return state;
  }
};
