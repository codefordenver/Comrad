import React, { Component } from 'react';
import { Field } from 'redux-form';
import classnames from 'classnames';

const Radio = props => {
  const { input } = props;

  return <input className="filter__radio" type="radio" {...input} />;
};

class Filter extends Component {
  render() {
    const { className, onChange, name, text, value } = this.props;

    return (
      <label className={classnames('filter', className)}>
        <Field
          component={Radio}
          name={name}
          onChange={onChange}
          type="radio"
          value={value}
        />
        <span className={'filter__text'}>{text}</span>
      </label>
    );
  }
}

export default Filter;
