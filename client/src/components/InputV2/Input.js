import React, { Component } from 'react';
import { Field } from 'redux-form';

import classnames from 'classnames';
import { Label } from './Label';

export class Input extends Component {
  getClassNames = () => {
    console.log(this.props);
    const { className } = this.props;

    return classnames('Input', className);
  };

  render() {
    const { getClassNames, props } = this;

    const { className, label, name } = props;

    return (
      <Field
        className={getClassNames()}
        name={name}
        component={({ input, meta }) => {
          console.log(input);
          console.log(meta);
          return (
            <>
              <input className={classnames(className)} {...input} />
              {label && <Label {...meta}>{label}</Label>}
            </>
          );
        }}
      />
    );
  }
}
