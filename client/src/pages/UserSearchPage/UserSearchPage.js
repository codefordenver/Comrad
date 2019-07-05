import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';
import Dropdown from '../../components/Dropdown';
import FormUserSearch from '../../components/forms/FormUserSearch';
import TableUsers from '../../components/tables/TableUsers';

import { userActions } from '../../redux';

class UserSearchPage extends Component {
  componentDidMount() {
    const { userActions, userState } = this.props;

    userActions.search(userState.search);
  }

  render() {
    const { props } = this;

    return (
      <div className="usp">
        <Card>
          <CardBody>
            <h1 className="mb-0">Users</h1>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="usp__section-1">
              <div className="usp__section-1--1">
                <FormUserSearch />
              </div>
              <div className="usp__section-1--2">
                <Dropdown position="right-centered" type="button" text="Add">
                  <Dropdown.Item to="add">User</Dropdown.Item>
                </Dropdown>
              </div>
            </div>

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
