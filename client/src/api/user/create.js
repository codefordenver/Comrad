import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function create(values) {
  const { first_name, last_name, email, password } = values;

  const userObj = {
    first_name,
    last_name,
    email,
    password,
  };

  return axios.post(ROOT_USERS_URL, userObj);
}
