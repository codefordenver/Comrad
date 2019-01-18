import React, { Component } from 'react';
import { connect } from 'react-redux';
import { usersClear, usersSearch } from '../../actions/users.js';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import Form from '../../components/Form';
import Input from '../../components/Input';
import LargeText from '../../components/LargeText';
import TableUsers from '../../components/TableUsers';

class UserSearchPage extends Component {
  render() {
    const { docs, error, q, loading, usersSearch } = this.props;

    return (
      <div className="user-search">
        <Card>
          <CardBody>
            <h1 className="mb-0">Users</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="user-search__header">
              <Form action={usersSearch}>
                <Input label="Search" name="q" icon="search" />
                <Button type="submit">Search</Button>
              </Form>
              <Dropdown type="plus" text="Search">
                <DropdownItem to="user/add">Add</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
              </Dropdown>
            </div>

            {error && <Alert type="danger" header="Users Error" text={error} />}

            {q === false ? (
              <LargeText>Search For Users</LargeText>
            ) : docs.length === 0 ? (
              <LargeText>No User Found</LargeText>
            ) : docs.length > 0 ? (
              <TableUsers docs={docs} loading={loading} />
            ) : null}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { docs, error, loading, q } = state.users;
  return {
    docs,
    error,
    loading,
    q,
  };
}

export default connect(
  mapStateToProps,
  { usersClear, usersSearch },
)(UserSearchPage);
