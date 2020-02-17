import React, { Component } from 'react';

import Button from '../../components/Button';
import FormUserDevelopmentSignup from '../../components/forms/FormUserDevelopmentSignup';

// for development only - not in production
// shown by the REACT_APP_SHOW_DEVELOPMENT_SIGN_UP and SHOW_DEVELOPMENT_SIGN_UP environment variables

class DevelopmentSignUpPage extends Component {
  render() {
    const { props } = this;

    return (
      <div className="signup-page">
        <p>Enter your information</p>

        <div className="signup-page__form mb-5">
          <FormUserDevelopmentSignup {...props} />
        </div>

        <div className="signup-page__go-back">
          <Button to="/" color="link">
            Go Back
          </Button>
        </div>
      </div>
    );
  }
}

export default DevelopmentSignUpPage;
