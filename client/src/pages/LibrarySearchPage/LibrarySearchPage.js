import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import ReactTable from 'react-table';

import Card, { CardBody } from '../../components/Card';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import DeleteModal from '../../components/DeleteModal';

import { alertActions, libraryActions } from '../../redux';

class LibrarySearchPage extends Component {
  state = {
    activeFilter: 'all',
    deleteModal: false, //false to hide, or an object of data if the modal should be displayed
    page: 0,
    searchString: null,
    sort: {
      id: null,
      desc: null,
    },
  };

  componentWillUnmount = () => {
    this.props.libraryActions.clear();
  };

  closeDeleteModal = () => {
    this.setState({ deleteModal: false });
  };

  deleteFailure = () => {
    window.scrollTo(0, 0);
    this.closeDeleteModal();
  };

  deleteSuccess = entity => {
    window.scrollTo(0, 0);
    this.closeDeleteModal();
    this.props.alertActions.hide();
    this.props.alertActions.show(
      'success',
      'Success',
      `${entity.data.name} was successfully deleted`,
    );
    //refresh data from the database - https://github.com/tannerlinsley/react-table/issues/808#issuecomment-373673915
    this.table.fireFetchData();
  };

  fetchData = (tableState, instance) => {
    //if the sort values have changed, update that in state
    if (
      tableState.sorted.length > 0 &&
      (tableState.sorted[0].id !== this.state.sort.id ||
        tableState.sorted[0].desc !== this.state.sort.desc)
    ) {
      this.setState(
        {
          page: tableState.page,
          sort: {
            id: tableState.sorted[0].id,
            desc: tableState.sorted[0].desc,
          },
        },
        function() {
          this.loadLibraryData();
        },
      );
    } else {
      this.setState(
        {
          page: tableState.page,
        },
        function() {
          this.loadLibraryData();
        },
      );
    }
  };

  handleRowDeleteClick = data => {
    this.setState({
      deleteModal: data,
    });
  };

  handleRowEditClick = data => {
    const { history } = this.props;
    if (data.type === 'track') {
      history.push('/library/track/' + data._original._id + '/edit');
    } else if (data.type === 'album') {
      history.push('/library/album/' + data._original._id + '/edit');
    }
  };

  loadLibraryData = () => {
    const { activeFilter, searchString, sort, page } = this.state;
    const { libraryActions, loadingSearch } = this.props;
    //React Table can sometimes fire this function when it's already in the process of being called from a setstate callback
    if (!loadingSearch) {
      libraryActions.search(activeFilter, searchString, sort, page);
    }
  };

  navigateToRecord = (state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        //navigate to the view page for this record
        this.props.history.push(
          '/library/' + rowInfo.original.type + '/' + rowInfo.original._id,
        );
      },
    };
  };

  searchLibrary = form => {
    this.setState(
      {
        searchString: form.q,
      },
      function() {
        this.loadLibraryData();
      },
    );
  };

  setActiveFilter = event => {
    this.setState(
      {
        activeFilter: event.target.getAttribute('value'),
      },
      function() {
        this.loadLibraryData();
      },
    );
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { closeDeleteModal, columns, deleteEntity } = this;
    const {
      auth,
      handleSubmit,
      docs,
      loadingSearch,
      loadingError,
      totalPages,
    } = this.props;
    const { activeFilter, deleteModal, searchString } = this.state;

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
                    className={'' + (activeFilter === 'all' ? 'active' : '')}
                    onClick={this.setActiveFilter}
                    value="all"
                  >
                    ALL
                  </span>
                  <span
                    className={'' + (activeFilter === 'artist' ? 'active' : '')}
                    onClick={this.setActiveFilter}
                    value="artist"
                  >
                    ARTISTS
                  </span>
                  <span
                    className={'' + (activeFilter === 'album' ? 'active' : '')}
                    onClick={this.setActiveFilter}
                    value="album"
                  >
                    ALBUMS
                  </span>
                  <span
                    className={'' + (activeFilter === 'track' ? 'active' : '')}
                    onClick={this.setActiveFilter}
                    value="track"
                  >
                    TRACKS
                  </span>
                </div>
              </div>
              {(auth.doc.role === 'Admin' ||
                auth.doc.role === 'Full Access' ||
                auth.doc.role === 'Music Library Admin') && (
                <div>
                  <Dropdown position="right-centered" type="button" text="Add">
                    <Dropdown.Item to="library/artist/add">
                      Artist
                    </Dropdown.Item>
                    <Dropdown.Item to="library/album/add">Album</Dropdown.Item>
                  </Dropdown>
                </div>
              )}
            </div>

            {!loadingError && (
              <ReactTable
                className="-highlight library-search__grid clickable-rows"
                columns={columns}
                data={docs != null ? docs : []}
                pages={totalPages}
                loading={loadingSearch}
                manual
                noDataText="No Data Found"
                showPageSizeOptions={false}
                onFetchData={this.fetchData}
                ref={instance => {
                  this.table = instance;
                }}
                showPageJump={false}
                sortable={searchString == null || searchString.length === 0}
                getTdProps={this.navigateToRecord}
              />
            )}
            {loadingError && (
              <div>An error occurred loading data. Please try again.</div>
            )}
          </CardBody>
        </Card>

        {/* Delete modal */}
        {deleteModal ? (
          <DeleteModal
            deleteModal={deleteModal}
            closeDeleteModal={closeDeleteModal}
            deleteEntity={deleteEntity}
            deleteSuccess={this.deleteSuccess}
            deleteFailure={this.deleteFailure}
          />
        ) : null}
      </div>
    );
  }

  columns = [
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
            if (typeof data.original.artists !== 'undefined') {
              data.original.artists.forEach(function(a) {
                if (
                  a != null &&
                  typeof a.name != 'undefined' &&
                  a.name.length > 0
                ) {
                  artistNames.push(a.name);
                }
              });
            }
            let elements = [];
            elements.push(data.value);
            if (artistNames.length > 0) {
              elements.push(
                <span
                  key="artist-name"
                  className="library-search__grid__secondary-text"
                >
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
                <span
                  key="album-name"
                  className="library-search__grid__secondary-text"
                >
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
                <span
                  key="album-artist-name"
                  className="library-search__grid__secondary-text"
                >
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
      headerStyle: {
        borderRight: '0',
      },
      style: {
        borderRight: '0',
      },
    },
    {
      Header: '',
      Cell: row => {
        return (
          <div onClick={this.stopPropagation}>
            {(this.props.auth.doc.role === 'Admin' ||
              this.props.auth.doc.role === 'Full Access' ||
              this.props.auth.doc.role === 'Music Library Admin') && (
              <Dropdown
                position="bottom-left"
                type="icon"
                faClass="fas fa-ellipsis-h"
              >
                {row.row.type !== 'artist' && (
                  <Dropdown.Item
                    handleOnClick={() => this.handleRowEditClick(row.row)}
                  >
                    Edit
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  handleOnClick={() => this.handleRowDeleteClick(row.row)}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown>
            )}
          </div>
        );
      },
      minWidth: undefined,
      className: 'library-search__grid__edit-options',
    },
  ];
}

function mapStateToProps(state) {
  const { docs, loadingSearch, loadingError, totalPages } = state.library;
  const { auth } = state;

  return {
    auth,
    docs,
    loadingSearch,
    loadingError,
    totalPages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

const ReduxLibrarySearchPage = reduxForm({
  form: 'librarySearch',
})(LibrarySearchPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxLibrarySearchPage);
