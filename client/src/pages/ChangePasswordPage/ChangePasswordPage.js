import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import FormChangePassword from '../../components/forms/FormChangePassword';

class ChangePasswordPage extends Component {
  changePasswordCallback = id => {
    this.props.history.push('/dashboard'); //route to dashboard after submit
  };

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <h1>Change Password</h1>
            <FormChangePassword submitCallback={this.changePasswordCallback} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ChangePasswordPage;
