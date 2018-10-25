import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Filter } from '../../components/Filter'
import SearchUsers from '../../components/Search/SearchUsers';
import UsersTable from '../../components/Tables/UsersTable';

class UserSearch extends Component {
  state = {
    filter: 'All',
    filterItems: ['All', 'Active', 'Inactive']
  }

  handleFilterChange = item => {
    this.setState({
      filter: item
    })
  }

  render() {
    const { url } = this.props.match

    return (
      <div className="user__search">
        <div className="user__header">
          <div className="user__title">
            Users <Link to={`${url}/add`}>Add</Link>
          </div>

          <div className="user__search">
            <SearchUsers />
          </div>
        </div>

        <div className="user__options">
          <div className="user__filter">
            <Filter
              filterItems={this.state.filterItems}
              handleFilterChange={this.handleFilterChange}
            />
          </div>

          <div className="user__pagination">Pagination</div>
        </div>
        <div className="user__table">
          <UsersTable 
            filter={this.state.filter}
          />
        </div>
      </div>
    )
  }
}

export default UserSearch
