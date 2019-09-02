import React from 'react';
import { Field } from 'redux-form';

import classnames from 'classnames';
import { Feedback } from './Feedback';
import { Label } from './Label';

export function Input({ className, label, name, validate }) {
  function getClassNames({ error, touched }) {
    const isError = touched && error && 'error';

    return classnames('Input', className, isError);
  }

  function renderLabel(meta) {
    return label ? <Label {...meta}>{label}</Label> : false;
  }

  function renderFeedback({ error, touched }) {
    return touched && error ? <Feedback type="error">{error}</Feedback> : false;
  }

  return (
    <Field
      name={name}
      validate={validate}
      component={({ input, meta }) => {
        return (
          <>
            <input className={classnames(getClassNames(meta))} {...input} />
            {renderLabel(meta)}
            {renderFeedback(meta)}
          </>
        );
      }}
    />
  );
}
