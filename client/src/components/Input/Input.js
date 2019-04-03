import React, { Component } from 'react';
import classnames from 'classnames';

export const ICON_SET = {
  search: <i className="icon fas fa-search" />,
  user: <i className="icon fas fa-user" />,
};

export const InputError = props => {
  const { children } = props;
  return <div className="input__error">{children}</div>;
};

export const InputLabel = props => {
  const {
    active,
    children,
    dirty,
    error,
    initial,
    touched,
    dirtyOverride,
  } = props;

  return (
    <div
      className={classnames(
        'input__label',
        (active || initial) && 'active',
        (dirty || dirtyOverride) && 'dirty',
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

    const {
      autoFocus,
      className,
      icon,
      inline,
      input,
      label,
      meta,
      type,
      dirtyOverride = false,
      ...other
    } = props;
    const { error, touched } = meta;

    return (
      <div
        className={classnames('form-group', className, {
          'form-group--inline': inline,
        })}
      >
        <input
          {...input}
          {...other}
          autoFocus={autoFocus}
          className={classnames('input', touched && error && 'error')}
          type={type}
          onBlur={() => input.onBlur()}
        />

        {label && (
          <InputLabel {...meta} dirtyOverride={dirtyOverride}>
            {label}
          </InputLabel>
        )}
        {touched && error && <InputError>{error}</InputError>}
        {icon && ICON_SET[icon]}
      </div>
    );
  }
}

export default Input;
