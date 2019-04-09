import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';
import FormUserSearch from '../../components/FormUserSearch';
import TableUsers from '../../components/TableUsers';

import { userAlertClose } from '../../redux/user';

class UserSearchPage extends Component {
  render() {
    const { user, userAlertClose } = this.props;
    const { alert } = user;

    return (
      <div className="user-search">
        <Alert alertClose={userAlertClose} {...alert} />
        <Card>
          <CardBody>
            <h1 className="mb-0">Users</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <FormUserSearch />
            <TableUsers />
          </CardBody>
        </Card>
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
)(UserSearchPage);
