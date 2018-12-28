import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetUser } from '../../actions';
import { REGEX_EMAIL } from '../../utils/validation';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';

class ResetForm extends Component {
  render() {
    const { message, resetUser } = this.props;

    return (
      <Form action={resetUser}>
        <Alert />
        <FormGroup>
          <Input
            name="email"
            type="text"
            feedback="Please Enter Email Address"
            label="Email"
            validate={REGEX_EMAIL}
          />
        </FormGroup>

        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.message,
  };
}

export default connect(
  mapStateToProps,
  { resetUser },
)(ResetForm);
