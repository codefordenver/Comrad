export const emailValidate = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const passwordsMatchValidate = (value, { passNew }) =>
  value !== passNew ? 'Passwords do not match' : undefined;

export const requiredValidate = value => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return 'Required';
    } else {
      let error = undefined;
      value.forEach(v => {
        if (
          !v ||
          v === null ||
          (typeof v === 'object' && Object.keys(v).length === 0)
        ) {
          error = 'Required';
        }
      });
      return error;
    }
  } else {
    return value || typeof value === 'number' ? undefined : 'Required';
  }
};

export const integerValidate = (value) => {
  if (!isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10))
     ) {
    return null;
  } else {
    return "Integer required";
  }
}

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
