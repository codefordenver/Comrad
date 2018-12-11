import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Search extends Component {
  state = {
    searchTerm: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { searchTerm } = this.state;
    const { type } = this.props;

    switch (type) {
      case 'library':
        this.props.searchLibrary(searchTerm);
        break;
      case 'user':
        this.props.searchUsers(searchTerm);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleFormSubmit}>
          <input
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            type="text"
            className="search__input"
          />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    all: state.search.all,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(Search);
