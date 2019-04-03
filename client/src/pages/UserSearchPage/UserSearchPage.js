import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { userSearch } from '../../redux/user';

import { user } from '../../utils/api';

import Card, { CardBody } from '../../components/Card';
import FormUserSearch from '../../components/FormUserSearch';
import TableUsers from '../../components/TableUsers';

class UserSearchPage extends Component {
  state = {
    docs: [],
    loading: false,
    search: {
      filter: 'All',
      s: '',
    },
  };

  async componentDidMount() {
    const { search } = this.state;
    const { data } = await user.search(search);

    this.setState({
      docs: data,
    });
  }

  handleUserSubmit = async values => {
    const { data } = await user.search(values);

    this.setState({
      docs: data,
    });
  };

  render() {
    const { handleUserSubmit, state } = this;
    const { docs } = state;

    return (
      <div className="user-search">
        <Card>
          <CardBody>
            <h1 className="mb-0">Users</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <FormUserSearch handleUserSubmit={handleUserSubmit} />
            <TableUsers docs={docs} />
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
  {},
)(UserSearchPage);
