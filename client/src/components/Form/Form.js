import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validation from '../../utils/validation';

class Form extends Component {
  confirmPassword({ confirm_password }) {
    if (!confirm_password) {
      return true;
    }

    return true;
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    const { action, callback, input, options } = this.props;
    const valid = validation.form();

    if (valid && this.confirmPassword(input) && action) {
      if (options) {
        return action(input, options, callback);
      }
      console.log('submit');
      return action(input, callback);
    }
  };

  render() {
    const { children, onSubmit, className } = this.props;

    return (
      <form
        className={classnames('form', className)}
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
