import React, { Component } from 'react';

import Button from '../../components/Button';
import FormPasswordNew from '../../components/forms/FormPasswordNew';

class PasswordNewPage extends Component {
  render() {
    const { props } = this;

    return (
      <div className="password-new-page">
        <p>Enter Your New Password</p>
        <FormPasswordNew className="mb-3" {...props} />
        <Button to="/">Go Back</Button>
      </div>
    );
  }
}

export default PasswordNewPage;
