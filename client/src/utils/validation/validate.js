import patterns from './patterns';

export function validateInput({ name, value, classList }) {
  return patterns[name].test(value);
}

export function validateSubmit() {
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
}
