import patterns from './patterns';

export function validateInput({ name, value }) {
  return patterns[name].test(value);
}

export function validateSubmit() {
  const inputs = document.querySelectorAll('input');
  const selects = document.querySelectorAll('select');

  const form = [...inputs, ...selects];

  let valid = true;

  form.forEach(item => {
    const { classList, name, value } = item;
    if (!patterns[name].test(value)) {
      classList.add('invalid');
      return (valid = false);
    }

    if (value === '') {
      classList.add('invalid');
      return (valid = false);
    }

    classList.remove('invalid');
  });

  return valid;
}
