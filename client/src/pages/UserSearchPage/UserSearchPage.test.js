import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Filter } from '../../components/Filter';
import Search from '../../components/Search';
import UsersTable from '../../components/Tables/UsersTable';

class UserSearchPage extends Component {
  state = {
    filter: 'All',
  };

  handleFilterClick = item => {
    this.setState({
      filter: item,
    });
  };

  render() {
    const { url } = this.props.match;
    const filterItems = ['All', 'Active', 'Inactive'];

    return (
      <div className="user__search">
        <div className="user__header">
          <div className="user__title">
            Users <Link to={`${url}/add`}>Add</Link>
          </div>

          <div className="user__search">
            <Search type="user" />
          </div>
        </div>

        <div className="user__options">
          <div className="user__filter">
            <Filter
              filterItems={filterItems}
              handleFilterClick={this.handleFilterClick}
            />
          </div>

          <div className="user__pagination">Pagination</div>
        </div>
        <div className="user__table">
          <UsersTable filter={this.state.filter} />
        </div>
      </div>
    );
  }
}

export default UserSearchPage;
