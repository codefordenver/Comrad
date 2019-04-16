import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';
import FormUserSearch from '../../components/FormUserSearch';
import TableUsers from '../../components/TableUsers';

import { userAlertClose, userSearch } from '../../redux/user';

class UserSearchPage extends Component {
  componentDidMount() {
    const { user, userSearch } = this.props;
    const { search } = user;

    userSearch(search);
  }

  render() {
    const { user, userAlertClose } = this.props;
    const { alert } = user;
    const { display } = alert;

    return (
      <div className="user-search">
        {/* Error Alert */}
        {display && <Alert alertClose={userAlertClose} {...alert} />}

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
  { userAlertClose, userSearch },
)(UserSearchPage);
