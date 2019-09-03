import React from 'react';
import { Field } from 'redux-form';
import classnames from 'classnames';

export function Filter({ className, onChange, name, text, value }) {
  function getClassNames(meta) {
    return classnames('Filter__radio', className);
  }

  return (
    <label className={classnames('Filter', className)}>
      <Field
        name={name}
        onChange={onChange}
        type="radio"
        value={value}
        component={({ input, meta }) => {
          return (
            <input
              className={getClassNames(meta)}
              type="radio"
              {...input}
              checked={true}
            />
          );
        }}
      />
      <span className={'Filter__text'}>{text}</span>
    </label>
  );
}
