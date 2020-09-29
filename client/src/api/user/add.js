import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function add(values) {
  if (values.confirm_password != null) {
    delete values.confirm_password;
  }

  return axios.post(ROOT_USERS_URL, values);
}
