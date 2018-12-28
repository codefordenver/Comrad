import React, { Component } from 'react';
import { connect } from 'react-redux';
import { messageUpdate } from '../../actions';
import validation from '../../utils/validation';

class Form extends Component {
  confirmPassword() {
    const { input, messageUpdate } = this.props;
    const { confirm_password, password } = input;
    if (!confirm_password) {
      return true;
    }

    if (confirm_password !== password) {
      messageUpdate({
        type: 'error',
        text: 'Passwords do not match!',
      });
      return false;
    }

    return true;
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    const { callback, input, action } = this.props;
    const valid = validation.form();

    if (valid && this.confirmPassword()) {
      action(input, callback);
    }
  };

  render() {
    const { children, styleName = '' } = this.props;

    return (
      <form className={`form ${styleName}`} onSubmit={this.handleOnSubmit}>
        {children}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    input: state.input,
  };
}

export default connect(
  mapStateToProps,
  { messageUpdate },
)(Form);
