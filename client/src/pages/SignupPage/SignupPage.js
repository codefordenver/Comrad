import React, { Component } from 'react';

import Button from '../../components/Button';
import SignupForm from '../../components/SignupForm';

class SignupPage extends Component {
  render() {
    return (
      <div className="signup-page">
        <div className="signup-page__form mb-5">
          <SignupForm />
        </div>
        <div className="signup-page__go-back">
          <Button to="/">Go Back</Button>
        </div>
      </div>
    );
  }
}

export default SignupPage;
