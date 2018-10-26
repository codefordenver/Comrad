const patterns = {
  email: /^([a-zA-Z\d.-]+)@([a-zA-Z\d-]+\.)([a-zA-Z]{2,8})(.[a-zA-Z]{2,8})?$/,
  first_name: /^[a-zA-Z0-9\s]{3,}$/,
  last_name: /^[a-zA-Z0-9\s]{3,}$/,
  on_air_name: /^[a-zA-Z0-9\s]{3,}$/,
  role: /^[a-zA-Z]{1,}$/,
  status: /^[a-zA-Z]{1,}$/,
  can_delete: /^(true|false)$/
}

export const userValidation = {
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
    const selects = document.querySelectorAll('select');
    let valid = true;

    const form = [...inputs, ...selects];
    
    form.forEach(item => {
      if(item.classList.contains('invalid')) {
        return valid = false;
      }

      if(item.value === '') {
        item.classList.add('invalid');
        return valid = false;
      }
    });

    return valid;
  }
}