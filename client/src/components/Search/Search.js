import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Link } from 'react-router-dom'

class Search extends Component {
  state = {
    searchTerm: ''
  }

  handleInputChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { searchTerm } = this.state

    this.props.searchAll(searchTerm)
  }

  renderShortSearch() {
    const arrLength = this.props.results.length;
    const length = arrLength < 5 ? arrLength : 5;

    for(let i = 0; i < length; i++) {
      return (
        <li>{this.props.results[i].name}</li>
      )
    }
  }

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
        <ul className="search__list">
          <li className="search__item">
            <Link
              to="/library"
              id="all"
              className={`search__link ${
                this.props.filter === 'all' ? 'active' : ''
              }`}>
              All
            </Link>
            <Link
              to="/library/artists"
              id="artists"
              className={`search__link ${
                this.props.filter === 'artists' ? 'active' : ''
              }`}>
              Artists
            </Link>
            <Link
              to="/library/albums"
              id="albums"
              className={`search__link ${
                this.props.filter === 'albums' ? 'active' : ''
              }`}>
              Albums
            </Link>
            <Link
              to="/library/tracks"
              id="tracks"
              className={`search__link ${
                this.props.filter === 'tracks' ? 'active' : ''
              }`}>
              Tracks
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results
  }
}

export default connect(
  mapStateToProps,
  actions
)(Search)
