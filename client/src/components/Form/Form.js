import React, { Component } from 'react';
import { connect } from 'react-redux';
import { messageUpdate } from '../../actions';
import PropTypes from 'prop-types';
import validation from '../../utils/validation';

class Form extends Component {
  confirmPassword = () => {
    const { input, messageUpdate } = this.props;
    const { confirm_password, password } = input;
    if (!confirm_password) {
      return true;
    }

    if (confirm_password !== password) {
      messageUpdate({
        header: 'Passwords Do Not Match',
        type: 'error',
      });
      return false;
    }

    return true;
  };

  handleOnSubmit = async e => {
    e.preventDefault();
    const { callback, input, action } = this.props;
    const valid = validation.form();

    if (valid && this.confirmPassword() && action) {
      action(input, callback);
    }
  };

  render() {
    const { children, onSubmit, styleName = '' } = this.props;

    return (
      <form
        className={`form ${styleName}`}
        onSubmit={onSubmit || this.handleOnSubmit}
      >
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  action: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    input: state.input,
  };
}

export default connect(
  mapStateToProps,
  { messageUpdate },
)(Form);
