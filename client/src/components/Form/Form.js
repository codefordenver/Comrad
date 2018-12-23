import React, { Component } from 'react';
import { connect } from 'react-redux';
import validation from '../../utils/validation';

class Form extends Component {
  handleOnSubmit = async e => {
    e.preventDefault();
    const { callback, form, submit } = this.props;
    const valid = validation.form();
    let response = '';
    if (valid) {
      response = (await submit(form).status) || null;
      console.log(response);
      if (response === 200) {
        callback();
      }
    }
  };

  render() {
    const {
      children,
      handleFormSubmit,
      styleName = '',
      validate,
      ...rest
    } = this.props;

    return (
      <form className={`form ${styleName}`} onSubmit={this.handleOnSubmit}>
        {children}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Form);
