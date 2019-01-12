import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertUpdate } from '../../actions';
import PropTypes from 'prop-types';
import validation from '../../utils/validation';

class Form extends Component {
  confirmPassword = () => {
    const { input, alertUpdate } = this.props;
    const { confirm_password, password } = input;
    if (!confirm_password) {
      return true;
    }

    if (confirm_password !== password) {
      alertUpdate({
        header: 'Passwords Do Not Match',
        type: 'error',
      });
      return false;
    }

    return true;
  };

  handleOnSubmit = async e => {
    e.preventDefault();
    const { action, callback, input, options } = this.props;
    // const { q } = input;
    const valid = validation.form();

    if (valid && this.confirmPassword() && action) {
      // const { input } = this.props;

      // history.push(`?q=${q || ''}`);

      if (options) {
        return action(input, options, callback);
      }
      return action(input, callback);
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

Form.defaultProps = {
  action: null,
};

function mapStateToProps(state) {
  return {
    input: state.input,
  };
}

export default connect(
  mapStateToProps,
  { alertUpdate },
)(Form);
