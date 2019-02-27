import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSearch } from '../../redux/user';

import Card, { CardBody } from '../../components/Card';
import FilterUsers from '../../components/FilterUsers';
import FormUserSearch from '../../components/FormUserSearch';
import TableUsers from '../../components/TableUsers';

class UserSearchPage extends Component {
  componentDidMount() {
    const { user, userSearch } = this.props;
    const { search } = user;
    userSearch(search);
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
            <div className="user-search__form">
              <FormUserSearch />
            </div>
            <div className="user-search__filter">
              <FilterUsers />
            </div>
            <TableUsers />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = state.user;
  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  { userSearch },
)(UserSearchPage);
