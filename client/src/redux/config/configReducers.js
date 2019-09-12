import { configTypes } from './configTypes';

const initialState = {
  customFields: {},
  inComplianceReportingPeriod: null,
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

    case configTypes.IN_COMPLIANCE_REPORTING_PERIOD:
      return {
        ...state,
        inComplianceReportingPeriod: payload,
      };

    default:
      return state;
  }
};
