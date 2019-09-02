import { emailValidate, requiredValidate } from '../../utils/validation';

export const config = {
  validation: {
    status: true, // undefined or true
    params: {
      first_name: [requiredValidate],
      last_name: [requiredValidate],
      email: [emailValidate, requiredValidate],
    },
  },
};
