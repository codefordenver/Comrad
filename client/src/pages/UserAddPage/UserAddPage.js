import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import FormUserAdd from '../../components/forms/FormUserAdd';

class UserAddPage extends Component {
  render() {
    return (
      <div className="uap">
        <div className="uap__header">
          <Card>
            <CardBody>
              <h1 className="mb-0">Add User</h1>
            </CardBody>
          </Card>
        </div>
        <div className="uap__form">
          <Card>
            <CardBody>
              <FormUserAdd {...this.props} />
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default UserAddPage;
