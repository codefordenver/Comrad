import React, { Component } from 'react';

import Button from '../../components/Button';
import FormUserSignup from '../../components/forms/FormUserSignup';

class SignupPage extends Component {
  render() {
    const { props } = this;

    return (
      <div className="signup-page">
        <p>Enter your information</p>

        <div className="signup-page__form mb-5">
          <FormUserSignup {...props} />
        </div>

        <div className="signup-page__go-back">
          <Button to="/">Go Back</Button>
        </div>
      </div>
    );
  }
}

export default SignupPage;
