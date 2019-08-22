import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import classnames from 'classnames';

class Input extends Component {
  getClassNames = () => {
    console.log(this.props);
    const { className } = this.props;

    return classnames('Input', className);
  };

  render() {
    const { getClassNames, props } = this;

    const { name } = props;

    return (
      <Field
        className={getClassNames()}
        name={name}
        component={props => {
          console.log(props);
          return <input />;
        }}
      />
    );
  }
}

export const ConnectedInput = connect()(Input);
