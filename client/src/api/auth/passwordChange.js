import axios from 'axios';
import { ROOT_AUTH_URL } from '../root';

export function passwordChange({ passConfirm, passNew, id }) {
  return axios.put(`${ROOT_AUTH_URL}/password/change`, {
    passConfirm,
    passNew,
    id,
  });
}
