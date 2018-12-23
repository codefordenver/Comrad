import { patterns } from './patterns';

const validation = {
  input(type, value) {
    return patterns[type].test(value);
  },
  form() {
    const inputs = document.querySelectorAll('input');
    const selects = document.querySelectorAll('select');
    const form = [...inputs, ...selects];

    let valid = true;

    form.forEach(item => {
      const { attributes, classList, value } = item;
      const validate = attributes.getNamedItem('validate');
      if (!validate) {
        return;
      }

      if (!patterns[validate.value].test(value)) {
        classList.add('invalid');
        valid = false;
        return;
      }

      classList.remove('invalid');
    });

    return valid;
  },
};

export default validation;
