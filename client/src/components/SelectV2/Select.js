import React from 'react';
import { Field } from 'redux-form';

import classnames from 'classnames';
import config from './config';
import { Option } from './Option';
import { Label } from './Label';

function Select({ children, className, label, selected, name }) {
  function getClassNames() {
    return classnames('Select', className);
  }

  const defualtComponent = selected ? config.component[selected] : false;

  return (
    <Field
      className={getClassNames()}
      name={name}
      component={({ input, meta }) => {
        return (
          <>
            <select className={getClassNames()} {...input}>
              {defualtComponent()}
              {children}
            </select>
            {label && <Label {...meta}>{label}</Label>}
          </>
        );
      }}
    />
  );
}

Select.Option = Option;

export { Select };
