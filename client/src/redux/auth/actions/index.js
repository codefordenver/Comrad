import { fetch } from './fetch';
import { login } from './login';
import { logout } from './logout';
import { passwordNew } from './passwordNew';
import { passwordReset } from './passwordReset';
import { passwordChange } from './passwordChange';

export const authActions = {
  fetch,
  login,
  logout,
  passwordNew,
  passwordReset,
  passwordChange,
};
