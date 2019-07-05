import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function add(values) {
  const { email, first_name, last_name, password } = values;

  const userObj = {
    email,
    first_name,
    last_name,
    password,
  };

  return axios.post(ROOT_USERS_URL, userObj);
}
