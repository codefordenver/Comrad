export const emailValidate = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const passwordsMatchValidate = (value, { passNew }) =>
  value !== passNew ? 'Passwords do not match' : undefined;

export const requiredValidate = value =>
  value || typeof value === 'number' ? undefined : 'Required';

export const passwordConfirmValidate = (value, { password }) =>
  value !== password ? 'Passwords to not match' : undefined;
