import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import PropTypes from 'prop-types';
import classnames from 'classnames';

class Form extends Component {
  render() {
    const { props } = this;
    const { children, className, handleSubmit, submit } = props;

    return (
      <form
        className={classnames('form', className)}
        submit={handleSubmit(submit)}
      >
        {children}
      </form>
    );
  }
}

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
  submit: PropTypes.func,
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

export default connect(
  mapStateToProps,
  null,
)(ReduxForm);
