import { configTypes } from './configTypes';

const initialState = {
  customFields: {},
  inComplianceReportingPeriod: null,
  resourcesCategories: null,
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

    case configTypes.RESOURCES_CATEGORIES:
      return {
        ...state,
        resourcesCategories: payload,
      };

    default:
      return state;
  }
};
