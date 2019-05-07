import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import FormUserCreate from '../../components/FormUserCreate';

import { userAlertClose } from '../../redux/user';

class SignupPage extends Component {
  render() {
    const { props } = this;
    const { user, userAlertClose } = props;
    const { alert } = user;
    const { display } = alert;

    return (
      <div className="signup-page">
        {display && (
          <Alert className="mb-3" alertClose={userAlertClose} {...alert} />
        )}
        <p>Enter your information</p>
        <div className="signup-page__form mb-5">
          <FormUserCreate {...props} />
        </div>
        <div className="signup-page__go-back">
          <Button to="/">Go Back</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  { userAlertClose },
)(SignupPage);
