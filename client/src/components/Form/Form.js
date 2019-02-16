import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends Component {
  confirmPassword({ confirm_password }) {
    if (!confirm_password) {
      return true;
    }

    return true;
  }

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
