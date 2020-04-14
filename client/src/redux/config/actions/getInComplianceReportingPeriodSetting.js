import { configTypes } from '../configTypes';
import { configAPI } from '../../../api';

export const getInComplianceReportingPeriodSetting = () => async dispatch => {
  try {
    const { data } = await configAPI.getInComplianceReportingPeriodSetting();

    dispatch({
      type: configTypes.IN_COMPLIANCE_REPORTING_PERIOD,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
