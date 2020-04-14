import React from 'react';
import { connect } from 'react-redux';
import { Field, submit } from 'redux-form';
import classnames from 'classnames';

function Filter({
  checked,
  className,
  dispatch,
  name,
  submitOnClick,
  text,
  value,
}) {
  function getClassNames() {
    return classnames('Filter__radio', className);
  }

  function handleOnClick() {
    setTimeout(() => dispatch(submit('form')), 50);
  }

  return (
    <label className={classnames('Filter', className)}>
      <Field
        name={name}
        type="radio"
        value={value}
        component={({ input, meta }) => {
          return (
            <input
              checked={checked}
              className={getClassNames()}
              onClick={submitOnClick && handleOnClick}
              type="radio"
              {...input}
            />
          );
        }}
      />
      <span className={'Filter__text'}>{text}</span>
    </label>
  );
}

export const ConnectedFilter = connect()(Filter);
