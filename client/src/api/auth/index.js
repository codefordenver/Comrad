import { fetch } from './fetch';
import { login } from './login';
import { logout } from './logout';
import { passwordNew } from './passwordNew';
import { passwordReset } from './passwordReset';

export const authAPI = {
  fetch,
  login,
  logout,
  passwordNew,
  passwordReset,
};
