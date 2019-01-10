import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from '../../utils/queryString';
import { usersSearch } from '../../actions/users.js';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import NoResults from '../../components/NoResults';
import Pagination from '../../components/Pagination';
import SearchTotal from '../../components/SearchTotal';
import UsersTable from '../../components/UsersTable';

class UserHomePage extends Component {
  async componentDidMount() {
    const { location, usersSearch } = this.props;
    const { search } = location;

    if (search) {
      const query = queryString(search);
      await usersSearch(query);
    }
  }

  async componentDidUpdate() {
    const { location, usersSearch } = this.props;
    const { search } = location;

    if (search) {
      const query = queryString(search);
      await usersSearch(query);
    }
  }

  render() {
    const { location, usersSearch } = this.props;
    const { search } = location;
    const options = {
      limit: 10,
    };

    return (
      <div className="user-home">
        <div className="user-home__search">
          <Card>
            <CardBody>
              <h1>Users</h1>

              <div className="user-home__search-container">
                <Form
                  styleName="mr-2"
                  action={usersSearch}
                  options={options}
                  {...this.props}
                >
                  <FormGroup>
                    <Input label="Search" name="q" icon="search" />
                  </FormGroup>
                  <Button type="submit">Search</Button>
                </Form>
                <Dropdown type="plus" text="Search">
                  <DropdownItem to="user/add">Add</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                </Dropdown>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="user-home__pagination">
          <Pagination action={usersSearch} />
        </div>

        <div className="user-home__table">
          {search ? (
            <Card>
              <CardBody>
                <UsersTable />
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody>
                <NoResults>Search For Users</NoResults>
              </CardBody>
            </Card>
          )}
        </div>

        <div className="user-home__total">
          <SearchTotal />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { usersSearch },
)(UserHomePage);
