import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

import ReactTable from 'react-table';

import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

import { albumActions, trackActions } from '../../redux';
import { artistAlertClose } from '../../redux/artist/artistActions';

class LibrarySearchPage extends Component {
  state = {
    activeFilter: 'all',
    deleteModal: false, //false to hide, or an object of data if the modal should be displayed
    deleteSuccessModal: false, //false to hide, or an object of data if the modal should be displayed
    docs: [],
    totalPages: null,
    pageUrls: ['/v1/library'],
    loading: true,
    loadingError: false,
    searchString: false,
    sort: {
      id: null,
      desc: null,
    },
  };

  closeAlerts = () => {
    const { artistAlertClose, albumActions, trackActions } = this.props;
    artistAlertClose();
    albumActions.alertClose();
    trackActions.alertClose();
  };

  closeDeleteModal = () => {
    this.setState({ deleteModal: false }, function() {
      this.closeAlerts();
    });
  };

  closeDeleteSuccessModal = () => {
    this.setState({ deleteSuccessModal: false });
  };

  deleteEntity = (type, id) => {
    const { albumActions } = this.props;
    if (type === 'album') {
      albumActions.remove(id, this.deleteSuccess);
    } //else if (type === 'track') {
    //}
  };

  deleteSuccess = entity => {
    this.closeDeleteModal();
    this.setState(
      {
        deleteSuccessModal: entity.data,
      },
      function() {
        //refresh data from the database - https://github.com/tannerlinsley/react-table/issues/808#issuecomment-373673915
        this.table.fireFetchData();
      },
    );
  };

  fetchData = (state, instance) => {
    this.setState({ loading: true }); //show loading overlay
    let url = this.state.pageUrls[state.page];

    //check that the sort value matches what was previously there
    if (
      state.sorted.length > 0 &&
      (state.sorted[0].id !== this.state.sort.id ||
        state.sorted[0].desc !== this.state.sort.desc)
    ) {
      url +=
        '?sortBy=' +
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
  };

  fetchTableDataFromApi = url => {
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
  };

  getAllMusicLibraryRecords = () => {
    let url = '/v1/library/';
    if (this.state.activeFilter !== 'all') {
      url = `/v1/library/${this.state.activeFilter}`;
    }
    this.setState(
      {
        pageUrls: [url],
        searchString: false,
      },
      function() {
        this.fetchTableDataFromApi(this.state.pageUrls[0]);
      },
    );
  };

  handleRowDeleteClick = data => {
    this.setState({
      deleteModal: data,
    });
  };

  handleRowEditClick = data => {
    console.log('edit was clicked');
    console.log(data);
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
    if (form.q != null && form.q.length > 0) {
      let url =
        '/v1/library/search?s=' + form.q + '&type=' + this.state.activeFilter;
      this.setState(
        {
          pageUrls: [url],
          searchString: form.q,
        },
        function() {
          this.fetchTableDataFromApi(url);
        },
      );
    } else {
      this.getAllMusicLibraryRecords();
    }
  };

  setActiveFilter = event => {
    this.setState(
      {
        activeFilter: event.target.getAttribute('value'),
      },
      function() {
        if (
          this.state.searchString != null &&
          this.state.searchString.length > 0
        ) {
          this.searchLibrary({ q: this.state.searchString });
        } else {
          this.getAllMusicLibraryRecords();
        }
      },
    );
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { closeDeleteModal, closeDeleteSuccessModal, deleteEntity } = this;
    const {
      artistAlert,
      albumAlert,
      albumActions,
      handleSubmit,
      trackActions,
      trackAlert,
    } = this.props;
    const { deleteModal, deleteSuccessModal } = this.state;

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
            </div>
          );
        },
        minWidth: undefined,
        className: 'library-search__grid__edit-options',
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
                <Dropdown position="right-centered" type="button" text="Add">
                  <Dropdown.Item to="library/artist/add">Artist</Dropdown.Item>
                  <Dropdown.Item to="library/album/add">Album</Dropdown.Item>
                </Dropdown>
              </div>
            </div>

            {!this.state.loadingError && (
              <ReactTable
                className="-highlight library-search__grid clickable-rows"
                columns={columns}
                data={this.state.docs}
                pages={this.state.totalPages}
                loading={this.state.loading}
                manual
                noDataText="No Data Found"
                showPageSizeOptions={false}
                onFetchData={this.fetchData}
                ref={instance => {
                  this.table = instance;
                }}
                showPageJump={false}
                sortable={this.state.searchString === false}
                getTdProps={this.navigateToRecord}
              />
            )}
            {this.state.loadingError && (
              <div>An error occurred loading data. Please try again.</div>
            )}
          </CardBody>
        </Card>

        {/* Delete modal */}
        {deleteModal ? (
          <Modal isOpen={true}>
            <div className="library-search__delete-modal">
              {/*artistAlert.display && (
                <Alert alertClose={artistAlertClose} {...artistAlert} />
              )*/}
              {/*albumAlert.display && (
                <Alert alertClose={albumActions.alertClose} {...albumAlert} />
              )*/}
              {/*trackAlert.display && (
                <Alert alertClose={trackActions.alertClose} {...trackAlert} />
              )*/}
              Are you sure you want to delete the {deleteModal.type}{' '}
              <i>{deleteModal.name}</i>?
              <div>
                <Button color="neutral" onClick={closeDeleteModal}>
                  No
                </Button>
                <Button
                  type="submit"
                  onClick={() =>
                    deleteEntity(deleteModal.type, deleteModal._original._id)
                  }
                >
                  Yes
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}

        {/* Delete confirmation modal */}
        {deleteSuccessModal ? (
          <Modal isOpen={true}>
            <div className="library-search__delete-success-modal">
              <i>{deleteSuccessModal.name}</i> was successfully deleted.
              <div>
                <Button color="neutral" onClick={closeDeleteSuccessModal}>
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { error } = state.library;
  const artistAlert = state.artist.alert;
  const albumAlert = state.album.alert;
  const trackAlert = state.track.alert;

  return {
    artistAlert,
    albumAlert,
    error,
    trackAlert,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    artistAlertClose,
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
    trackActions: bindActionCreators({ ...trackActions }, dispatch),
  };
}

const ReduxLibrarySearchPage = reduxForm({
  form: 'librarySearch',
})(LibrarySearchPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxLibrarySearchPage);
