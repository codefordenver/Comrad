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
  const { active, children, dirty, error, touched, dirtyOverride } = props;

  return (
    <div
      className={classnames(
        'input__label',
        active && 'active',
        (dirty || dirtyOverride) && 'dirty',
        touched && error && 'error',
      )}
    >
      {children}
    </div>
  );
};

class Input extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    const { props } = this;

    const {
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
          ref={this.inputRef}
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

  componentDidMount() {
    if (this.props.focus) {
      this.inputRef.current.focus();
    }
  }
}

export default Input;
