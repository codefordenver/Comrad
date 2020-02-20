export const emailValidate = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const passwordsMatchValidate = (value, { passNew }) =>
  value !== passNew ? 'Passwords do not match' : undefined;

export const requiredValidate = value =>
  value || typeof value === 'number' ? undefined : 'Required';

export const albumNeedsArtistOrCompilation = (value, allValues) => {
  // Artist set and compilation is true
  if (
    allValues.artist != null &&
    allValues.compilation != null &&
    allValues.compilation
  ) {
    return 'Album must have artist or be a compilation';
  }
  //Artist not set and compilation is false
  if (
    (typeof allValues.artist === 'undefined' || allValues.artist === null) &&
    (typeof allValues.compilation === 'undefined' ||
      allValues.compilation === false)
  ) {
    return 'Album must have artist or be a compilation';
  }
  return undefined;
};

export const passwordConfirmValidate = (value, { password }) =>
  value !== password ? 'Passwords to not match' : undefined;
