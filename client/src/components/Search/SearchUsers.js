import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchUsers } from '../../actions';

class SearchUsers extends Component {
  state = {
    searchTerm: ''
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { searchTerm } = this.state;

    this.props.searchUsers(searchTerm);
  }

  render() {
    return (
      <div className="search-users">
          <form onSubmit={this.handleFormSubmit}>
            <input
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.handleInputChange}
              type="text"
              className='search-users__input'
            />
            <button>Search</button>
          </form>
      </div>
    )
  }
}

export default connect(
  null,
  { searchUsers }
)(SearchUsers);