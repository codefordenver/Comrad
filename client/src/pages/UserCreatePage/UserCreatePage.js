import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import FormUserCreate from '../../components/forms/FormUserCreate';

class UserCreatePage extends Component {
  render() {
    return (
      <div className="uap">
        <Card>
          <CardBody>
            <h1 className="mb-0">Create User</h1>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <FormUserCreate {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserCreatePage;
