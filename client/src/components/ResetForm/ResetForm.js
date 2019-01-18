import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { REGEX_EMAIL } from '../../utils/validation';
import { requestReset } from '../../actions';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';

class ResetForm extends Component {
  render() {
    const { requestReset, user } = this.props;

    return (
      <Form action={requestReset}>
        <Alert />
        <p>Enter Email Address</p>
        <Input
          name="email"
          type="text"
          feedback="Please Enter Email Address"
          label="Email"
          validate={REGEX_EMAIL}
          disabled={user.loading}
        />

        <Button color="primary" type="submit">
          {user.loading ? 'Loading' : 'Submit'}
        </Button>
      </Form>
    );
  }
}

ResetForm.propTypes = {
  resetForm: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    message: state.message,
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  { requestReset },
)(ResetForm);
