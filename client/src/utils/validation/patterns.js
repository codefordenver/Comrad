import {
  REGEX_ANY_CHARS,
  REGEX_BOOL,
  REGEX_EMAIL,
  REGEX_LETTERS_NUMBERS,
} from './types';

export const patterns = {
  canDelete: REGEX_BOOL,
  email: REGEX_EMAIL,
  firstName: REGEX_LETTERS_NUMBERS,
  lastName: REGEX_LETTERS_NUMBERS,
  onAirName: REGEX_LETTERS_NUMBERS,
  password: REGEX_ANY_CHARS,
  role: REGEX_LETTERS_NUMBERS,
  status: REGEX_LETTERS_NUMBERS,
};
