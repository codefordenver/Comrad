import React, { Component } from 'react';
import { connect } from 'react-redux';
import { usersSearch } from '../../actions';

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
        {error && <Alert type="danger" header="Users Error" text={error} />}

        <Card>
          <CardBody>
            <h1 className="mb-0">Users</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="user-search__header">
              <div>
                <Form action={usersSearch}>
                  {/* <Input
                    className="mb-1"
                    label="Search"
                    name="q"
                    icon="search"
                  /> */}
                  <Button type="submit">Search</Button>
                </Form>
              </div>
              <div>
                <Dropdown type="plus" text="Add">
                  <DropdownItem to="user/add">Add</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                </Dropdown>
              </div>
            </div>

            <TableUsers docs={docs} loading={loading} />
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
  { usersSearch },
)(UserSearchPage);
