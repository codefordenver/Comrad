import React, { Component } from 'react';

import Button from '../../components/Button';

class SignupPage extends Component {
  render() {
    return (
      <div className="signup-page">
        <div className="signup-page__form mb-5" />
        <div className="signup-page__go-back">
          <Button to="/">Go Back</Button>
        </div>
      </div>
    );
  }
}

export default SignupPage;
