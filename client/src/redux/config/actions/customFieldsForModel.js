import { configTypes } from '../configTypes';
import { configAPI } from '../../../api';

export const customFieldsForModel = modelName => async dispatch => {
  try {
    const { data: fields } = await configAPI.customFieldsForModel(modelName);

    let payload = {};
    payload[modelName] = fields;

    dispatch({ type: configTypes.CUSTOM_FIELDS_FOR_MODEL, payload: payload });
  } catch (err) {
    console.log(err);
  }
};
