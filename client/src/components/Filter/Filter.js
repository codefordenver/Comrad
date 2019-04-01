import React, { Component } from 'react';
import { Field } from 'redux-form';
import classnames from 'classnames';

const Radio = props => {
  console.log(props.input.checked);
  return (
    <input
      className={props.className}
      type={props.type}
      checked={'checked'}
      {...props.input}
    />
  );
};

class Filter extends Component {
  render() {
    const { className } = this.props;

    console.log(this.props);

    return (
      <label className={classnames('filter', className)}>
        <Field
          className="filter__radio"
          name="sex"
          component={Radio}
          type="radio"
          value="male"
        />
        <span className={classnames('filter__text', className)}>Male</span>
      </label>
    );
  }
}

export default Filter;
