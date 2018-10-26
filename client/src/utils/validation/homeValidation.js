const patterns = {
  email: /^([a-zA-Z\d.-]+)@([a-zA-Z\d-]+\.)([a-zA-Z]{2,8})(.[a-zA-Z]{2,8})?$/,
  password: /^.{1,}$/
}

export const homeValidation = {
  input: ({ name, value, classList }) => {
    const result = patterns[name].test(value);

    switch (result) {
      case true:
        classList.add('valid')
        classList.remove('invalid')
        break
      case false:
        classList.add('invalid')
        classList.remove('valid')
        break
      default:
        break
    }
  },

  submit: () => {
    const inputs = document.querySelectorAll('input');
    let valid = true;

    inputs.forEach(input => {
      if(input.classList.contains('invalid')) {
        return valid = false;
      }

      if(input.value === '') {
        input.classList.add('invalid');
        return valid = false;
      }
    });

    return valid;
  }
}
