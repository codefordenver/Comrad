import patterns from './patterns';

const validate = {
  input: ({ name, value, classList }) => {
    const result = patterns[name].test(value);

    switch (result) {
      case true:
        classList.add('valid');
        classList.remove('invalid');
        break;
      case false:
        classList.add('invalid');
        classList.remove('valid');
        break;
      default:
        break;
    }
  },

  submit: () => {
    const inputs = document.querySelectorAll('input');
    const selects = document.querySelectorAll('select');

    const form = [...inputs, ...selects];

    let valid = true;

    form.forEach(item => {
      if (item.classList.contains('invalid')) {
        return (valid = false);
      }

      if (item.value === '') {
        item.classList.add('invalid');
        return (valid = false);
      }
    });

    return valid;
  },
};

export default validate;
