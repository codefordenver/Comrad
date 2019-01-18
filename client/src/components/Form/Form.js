import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validation from '../../utils/validation';

class Form extends Component {
  confirmPassword = () => {
    const { input } = this.props;
    const { confirm_password } = input;
    if (!confirm_password) {
      return true;
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
    const { children, onSubmit, className = '' } = this.props;

    return (
      <form
        className={`form ${className}`}
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

export default connect(mapStateToProps)(Form);
