import React, { Component } from 'react';
import classnames from 'classnames';

export const ICON_SET = {
  search: <i className="icon fas fa-search" />,
  user: <i className="icon fas fa-user" />,
};

const InputError = props => {
  const { children } = props;
  return <div className="input__error">{children}</div>;
};

const InputLabel = props => {
  const { active, children, dirty, error, touched } = props;

  return (
    <div
      className={classnames(
        'input__label',
        active && 'active',
        dirty && 'dirty',
        touched && error && 'error',
      )}
    >
      {children}
    </div>
  );
};

class Input extends Component {
  render() {
    const { props } = this;

    const { className, icon, input, label, meta, type } = props;
    const { error, touched } = meta;

    return (
      <div className={classnames('form-group', className)}>
        <input
          className={classnames('input', touched && error && 'error')}
          type={type}
          {...input}
        />
        {label && <InputLabel {...meta}>{label}</InputLabel>}
        {touched && error && <InputError>{error}</InputError>}
        {icon && ICON_SET[icon]}
      </div>
    );
  }
}

export default Input;
