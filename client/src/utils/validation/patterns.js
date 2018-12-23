import {
  REGEX_ANY_CHARS,
  REGEX_BOOL,
  REGEX_EMAIL,
  REGEX_LETTERS_NUMBERS,
  REGEX_PASSWORD,
} from './types';

export const patterns = {
  [REGEX_ANY_CHARS]: /^.+$/,
  [REGEX_BOOL]: /^(true|false)$/,
  [REGEX_EMAIL]: /^([a-zA-Z\d.-]+)@([a-zA-Z\d-]+\.)([a-zA-Z]{2,8})(.[a-zA-Z]{2,8})?$/,
  [REGEX_LETTERS_NUMBERS]: /^[a-zA-Z0-9\s]+$/,
  [REGEX_PASSWORD]: /^(?=.*\d).{4,8}$/, // Contain one lowercase, uppercase and letter
};
