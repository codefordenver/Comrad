import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

import ReactTable from 'react-table';

import Card, { CardBody } from '../../components/Card';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import Form from '../../components/Form';
import Input from '../../components/Input';

class LibrarySearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: 'all',
      docs: [],
      totalPages: null,
      pageUrls: ['/api/library'],
      loading: true,
      loadingError: false,
      searchString: false,
      sort: {
        id: null,
        desc: null,
      },
    };

    this.fetchData = this.fetchData.bind(this);
    this.fetchTableDataFromApi = this.fetchTableDataFromApi.bind(this);
    this.searchLibrary = this.searchLibrary.bind(this);
    this.setActiveFilter = this.setActiveFilter.bind(this);
  }

  fetchData(state, instance) {
    this.setState({ loading: true }); //show loading overlay
    let url = this.state.pageUrls[state.page];

    //check that the sort value matches what was previously there
    if (
      state.sorted.length > 0 &&
      (state.sorted[0].id !== this.state.sort.id ||
        state.sorted[0].desc !== this.state.sort.desc)
    ) {
      url =
        '/api/library?sortBy=' +
        state.sorted[0].id +
        '&sortDescending=' +
        (state.sorted[0].desc ? '1' : '0');
      this.setState({
        pageUrls: [url], //reset page URLs, we will have to rebuild this list for each page with the new results since the sort order has changed
        sort: {
          id: state.sorted[0].id,
          desc: state.sorted[0].desc,
        },
      });
    }

    this.fetchTableDataFromApi(url);
  }

  fetchTableDataFromApi(url) {
    axios
      .get(url)
      .then(response => {
        let pageUrls = this.state.pageUrls;
        if (typeof response.data.nextPage !== 'undefined') {
          pageUrls.push(response.data.nextPage.url);
        }
        this.setState({
          docs: response.data.results,
          totalPages: response.data.totalPages,
          pageUrls: pageUrls,
          loading: false,
          loadingError: false,
        });
      })
      .catch(response => {
        console.error(response);
        this.setState({
          loadingError: true,
        });
      });
  }

  searchLibrary = function(form) {
    let url =
      '/api/library/search?s=' + form.q + '&type=' + this.state.activeFilter;
    this.setState(
      {
        pageUrls: [url],
        searchString: form.q,
      },
      function() {
        this.fetchTableDataFromApi(url);
      },
    );
  };

  setActiveFilter = function(event) {
    this.setState(
      {
        activeFilter: event.target.getAttribute('value'),
      },
      function() {
        this.searchLibrary({ q: this.state.searchString });
      },
    );
  };

  render() {
    const { error, handleSubmit } = this.props;

    const columns = [
      {
        Header: 'Type',
        accessor: 'type',
        Cell: data => {
          return data.value.charAt(0).toUpperCase() + data.value.slice(1); //capitalize the first letter
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: data => {
          switch (data.row.type) {
            case 'track':
              let artistNames = [];
              data.original.artists.forEach(function(a) {
                if (typeof a.name != 'undefined' && a.name.length > 0) {
                  artistNames.push(a.name);
                }
              });
              let elements = [];
              elements.push(data.value);
              if (artistNames.length > 0) {
                elements.push(
                  <span className="library-search__grid__secondary-text">
                    {' '}
                    by {artistNames.join(', ')}
                  </span>,
                );
              }
              if (
                data.original.album != null &&
                typeof data.original.album.name != 'undefined' &&
                data.original.album.name.length > 0
              ) {
                elements.push(
                  <span className="library-search__grid__secondary-text">
                    {' '}
                    (from the album: {data.original.album.name})
                  </span>,
                );
              }
              return elements;
            case 'album':
              if (
                data.original.artist != null &&
                typeof data.original.artist.name != 'undefined' &&
                data.original.artist.name.length > 0
              ) {
                let elements = [];
                elements.push(data.value);
                elements.push(
                  <span className="library-search__grid__secondary-text">
                    {' '}
                    by {data.original.artist.name}
                  </span>,
                );
                return elements;
              } else {
                return data.value;
              }
            default:
              return data.value;
          }
        },
      },
      {
        Header: 'Updated At',
        accessor: 'updated_at',
        Cell: row => {
          let dateObj = new Date(row.value);
          return (
            dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString()
          );
        },
      },
    ];

    return (
      <div className="library-search">
        <Card>
          <CardBody>
            <h1 className="mb-0">Library</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="library-search__header">
              <div>
                <form onSubmit={handleSubmit(this.searchLibrary)}>
                  <Field
                    className="mb-1"
                    component={Input}
                    label="Search"
                    name="q"
                    type="text"
                  />
                </form>
                <div className="library-search__filters">
                  <span
                    className={
                      '' + (this.state.activeFilter === 'all' ? 'active' : '')
                    }
                    onClick={this.setActiveFilter}
                    value="all"
                  >
                    ALL
                  </span>
                  <span
                    className={
                      '' +
                      (this.state.activeFilter === 'artist' ? 'active' : '')
                    }
                    onClick={this.setActiveFilter}
                    value="artist"
                  >
                    ARTISTS
                  </span>
                  <span
                    className={
                      '' + (this.state.activeFilter === 'album' ? 'active' : '')
                    }
                    onClick={this.setActiveFilter}
                    value="album"
                  >
                    ALBUMS
                  </span>
                  <span
                    className={
                      '' + (this.state.activeFilter === 'track' ? 'active' : '')
                    }
                    onClick={this.setActiveFilter}
                    value="track"
                  >
                    TRACKS
                  </span>
                </div>
              </div>
              <div>
                <Dropdown type="plus" text="Add">
                  <DropdownItem to="artist/add">Artist</DropdownItem>
                  <DropdownItem to="album/add">Album</DropdownItem>
                </Dropdown>
              </div>
            </div>

            {!this.state.loadingError && (
              <ReactTable
                className="-highlight library-search__grid"
                columns={columns}
                data={this.state.docs}
                pages={this.state.totalPages}
                loading={this.state.loading}
                manual
                noDataText="No Data Found"
                showPageSizeOptions={false}
                onFetchData={this.fetchData}
                sortable={this.state.searchString === false}
              />
            )}
            {this.state.loadingError && (
              <div>An error occurred loading data. Please try again.</div>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { error } = state.library;
  console.log('map state to props');
  console.log(state);
  return {
    error,
  };
}

const ReduxLibrarySearchPage = reduxForm({
  form: 'librarySearch',
})(LibrarySearchPage);

export default connect(
  mapStateToProps,
  {},
)(ReduxLibrarySearchPage);
