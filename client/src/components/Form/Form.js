import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Group } from './Group';

/**
 * * WORK IN PROGRESS
 */

function Form({ children, className, handleSubmit, onSubmit }) {
  return (
    <form
      className={classnames('form', className)}
      onSubmit={onSubmit && handleSubmit(onSubmit)}
    >
      {children}
    </form>
  );
}

Form.Group = Group;

Form.propTypes = {
  /**
   * Any thing from elements to strings
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /**
   * Additional classes added to root element
   */
  className: PropTypes.string,
  /**
   * Function passed to be called when form is submitted
   */
  submitFunc: PropTypes.func,
};

const ReduxForm = reduxForm({
  form: 'form',
})(Form);

function mapStateToProps(state, ownProps) {
  const { initialValues } = ownProps;

  return {
    initialValues,
  };
}

export const ConnectedReduxForm = connect(
  mapStateToProps,
  null,
)(ReduxForm);
