import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card, { CardBody } from '../../components/Card';
import FormUserSearch from '../../components/FormUserSearch';
import TableUsers from '../../components/TableUsers';

import { userActions } from '../../redux';

class UserSearchPage extends Component {
  componentDidMount() {
    const { userActions, userState } = this.props;

    userActions.search(userState.search);
  }

  render() {
    return (
      <div className="user-search">
        <Card>
          <CardBody>
            <h1 className="mb-0">Users</h1>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <FormUserSearch />

            <TableUsers {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    userState: user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSearchPage);
