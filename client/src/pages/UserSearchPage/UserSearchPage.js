import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from '../../utils/queryString';
import { usersClear, usersSearch } from '../../actions/users.js';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import NoResults from '../../components/NoResults';
import Pagination from '../../components/Pagination';
import SearchTerm from '../../components/SearchTerm';
import SearchTotal from '../../components/SearchTotal';
import UsersTable from '../../components/TableUsers';

class UserSearchPage extends Component {
  async componentDidMount() {
    const { location, usersSearch } = this.props;
    const { search } = location;

    if (search) {
      const query = queryString(search);
      await usersSearch(query);
    }
  }

  componentWillUnmount() {
    const { usersClear } = this.props;
    usersClear();
  }

  // async componentDidUpdate() {
  //   const { location, usersSearch } = this.props;
  //   const { search } = location;

  //   if (search) {
  //     const query = queryString(search);
  //     await usersSearch(query);
  //   }
  // }

  render() {
    const { location, users, usersSearch } = this.props;
    const { search } = location;
    const options = { limit: 10 };

    return (
      <div className="user-search">
        <div className="user-search__search">
          <Card>
            <CardBody>
              <h1>Users</h1>

              <div className="user-search__search-container">
                <Form
                  className="mr-2"
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

        <Card>
          <CardBody>
            <div className="user-search__table">
              <div className="user-search__table-head">
                <div className="user-search__search-term">
                  <SearchTerm reducers={users} />
                </div>
                <div className="user-search__pagination">
                  <Pagination action={usersSearch} reducer={users} />
                </div>
              </div>
              {search ? (
                <UsersTable />
              ) : (
                <NoResults>Search For Users</NoResults>
              )}
            </div>

            <div className="user-search__total">
              <SearchTotal reducer={users} />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(
  mapStateToProps,
  { usersClear, usersSearch },
)(UserSearchPage);
