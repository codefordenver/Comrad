import axios from 'axios';
import { ROOT_AUTH_URL } from '../root';

export function passwordNew({ passConfirm, passNew, resetToken }) {
  return axios.put(`${ROOT_AUTH_URL}/password/new`, {
    passConfirm,
    passNew,
    resetToken,
  });
}
