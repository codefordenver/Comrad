import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card, { CardBody } from '../../components/Card';
import FormPasswordChange from '../../components/forms/FormPasswordChange';

class ChangePasswordPage extends Component {
  passwordChangeCallback = id => {
    this.props.history.push('/dashboard'); //route to dashboard after submit
  };

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <h1>Change Password</h1>
            <FormPasswordChange />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(ChangePasswordPage);
