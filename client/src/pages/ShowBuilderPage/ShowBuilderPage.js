import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import queryString from 'query-string';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Dropdown from '../../components/Dropdown';
import DropdownHost from '../../components/DropdownHost';
import DropdownLibrary from '../../components/DropdownLibrary';
import FormAlbumAdd from '../../components/forms/FormAlbumAdd';
import FormTrackAdd from '../../components/forms/FormTrackAdd';
import FormShowBuilderComment from '../../components/forms/FormShowBuilderComment';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import ShowBuilderItemList from '../../components/ShowBuilderItemList';

import { libraryActions, playlistActions, trafficActions } from '../../redux';
import {
  clearShows,
  createInstanceShow,
  getShowsData,
  searchShow,
  updateShow,
} from '../../redux/show';

import { getShowType } from '../../utils/shows';
import { getNextDiskAndTrackNumberForAlbum } from '../../utils/library';

class ShowBuilderPage extends Component {
  state = {
    activeTab: 'search',
    showAddTrackModal: false,
  };

  componentDidMount() {
    const {
      location,
      searchShow,
      libraryActions,
      playlistActions,
      trafficActions,
    } = this.props;
    const { startTime, endTime } = queryString.parse(location.search);

    //clear any existing library search
    libraryActions.clear();

    //find the playlist
    playlistActions.findOrCreateOne(startTime, endTime);

    //find traffic events during the show
    trafficActions.find(startTime, endTime);

    // format the show day/time

    const startTimeMoment = moment(startTime);
    const endTimeMoment = moment(endTime);

    let showDate = startTimeMoment.format('LL');
    showDate = showDate.substring(0, showDate.lastIndexOf(',')); // format as "March 3"

    this.setState({
      formattedDay: startTimeMoment.format('dddd') + ', ' + showDate,
      formattedStartTime: startTimeMoment.format('LT'),
      formattedEndTime: endTimeMoment.format('LT'),
    });

    // find the show that the query string represents
    endTimeMoment.subtract(1, 'minute'); //take a minute off, so we don't get the next show from the API
    searchShow(startTimeMoment, endTimeMoment);
  }

  componentWillUnmount() {
    const { clearShows, libraryActions } = this.props;
    clearShows();
    libraryActions.clear();
  }

  /* START - add track modal */

  addTrackModalAddNewAlbum = newAlbum => {
    this.setState({
      addTrackModalCurrentPage: 'track',
      addTrackModalSelectedAlbum: newAlbum,
    });
  };

  addTrackModalAddToSavedItems = track => {
    this.addTrackToSavedItems(track._id);
    this.addTrackModalClose();
  };

  addTrackModalAddToScratchpad = track => {
    this.addTrackToScratchpad(track._id);
    this.addTrackModalClose();
  };

  addTrackModalHandleAlbumSelect = selectedAlbum => {
    const { libraryActions } = this.props;
    // get the album from the API to populate the tracks
    libraryActions.findOne(selectedAlbum._id);
    // in case the form is submitted before the API call, we'll set the addTrackModalSelectedAlbum value to the current doc value
    this.setState({
      addTrackModalSelectedAlbum: selectedAlbum,
    });
  };

  addTrackModalSelectExistingAlbum = form => {
    const { library } = this.props;
    this.setState({
      addTrackModalSelectedAlbum:
        library.doc != null
          ? library.doc
          : this.state.addTrackModalSelectedAlbum, // check for this.props.library.doc in case there was an issue with the libraryActions.findOne API call
      addTrackModalCurrentPage: 'track',
    });
  };

  addTrackModalClose = () => {
    this.setState({
      showAddTrackModal: false,
    });
  };

  addTrackModalOpen = () => {
    this.setState({
      addTrackModalCurrentPage: 'album',
      showAddTrackModal: true,
    });
  };

  addTrackToSavedItems = trackId => {
    const { playlist, playlistActions } = this.props;
    playlistActions.addTrackToSavedItems(playlist.doc._id, trackId);
  };

  /* END - add track modal */

  addTrackToScratchpad = trackId => {
    const { playlist, playlistActions } = this.props;
    playlistActions.addTrackToScratchpad(playlist.doc._id, trackId);
  };

  handleHostSelect = host => {
    const { props } = this;
    const { updateShow, shows } = props;
    let show = shows[Object.keys(shows)[0]];
    const { _id, master_event_id } = show;
    const showType = getShowType(show);
    if (showType === 'series') {
      const { createInstanceShow } = this.props;
      show.show_details.host = host._id;
      createInstanceShow(master_event_id._id, show);
    } else {
      //Only update host if the show is regular or instance
      updateShow(_id, { 'show_details.host': host._id });
    }
  };

  searchLibrary = form => {
    const { libraryActions } = this.props;
    if (form.q.length === 0) {
      libraryActions.clear();
    } else {
      libraryActions.search('track', form.q, null, null, 20);
    }
  };

  render() {
    const {
      handleSubmit,
      library,
      playlist,
      shows,
      showFetching,
      traffic,
    } = this.props;
    const {
      activeTab,
      addTrackModalCurrentPage,
      addTrackModalSelectedAlbum,
      formattedDay,
      formattedEndTime,
      formattedStartTime,
      showAddTrackModal,
    } = this.state;
    let { scratchpad, saved_items } = playlist.doc;

    let showName = '';
    let host = null;
    if (shows && Object.keys(shows).length > 0) {
      if (Object.keys(shows).length > 1) {
        console.warn(
          'More than one show returned for show builder, using the first one',
        );
      }
      let show = shows[Object.keys(shows)[0]];
      showName = show.show_details.title;
      host = show.show_details.host;
    }

    let scratchpadForDisplay = [];
    let savedItemsForDisplay = [];

    if (
      !traffic.loading &&
      !playlist.loading &&
      typeof scratchpad !== 'undefined' &&
      typeof saved_items !== 'undefined'
    ) {
      scratchpadForDisplay = [...scratchpad];
      //modify the scratchpad list based on what traffic occurs at the time period
      //we will add any traffic itemsnot accounted for to scratchpad
      let trafficItemsForScratchpad = [...traffic.docs];
      saved_items.forEach(si => {
        if (si.type === 'traffic') {
          let matchingIndex = trafficItemsForScratchpad.findIndex(
            a => a.master_time_id === si.master_time_id,
          );
          trafficItemsForScratchpad.splice(matchingIndex, 1);
        }
      });
      trafficItemsForScratchpad.reverse();
      trafficItemsForScratchpad.forEach(t => {
        scratchpadForDisplay.unshift({
          type: 'traffic',
          traffic: t,
        });
      });
    }

    if (typeof saved_items !== 'undefined') {
      savedItemsForDisplay = [...saved_items];
      savedItemsForDisplay.reverse(); //display saved items in reverse chronological order
    }

    /* START - Add Track modal variables */
    let maxDiskNumber, maxTrackNumber;
    if (addTrackModalSelectedAlbum != null) {
      ({ maxDiskNumber, maxTrackNumber } = getNextDiskAndTrackNumberForAlbum(
        addTrackModalSelectedAlbum,
      ));
    }
    /* END - Add Track modal variables */

    return (
      <Card className="card--show-builder">
        {playlist.saving && (
          <div className="card--show-builder__saving-overlay" />
        )}
        <CardBody>
          <div className="show-builder">
            <div className="show-builder__top-row">
              <div>
                {!showFetching && (
                  <DropdownHost
                    key={host != null ? host._id : 'no host'}
                    host={host}
                    onHostSelect={this.handleHostSelect}
                    filterByStatus="Active"
                  />
                )}
              </div>
              <div>{showName}</div>
              <div>
                {formattedDay}
                <br />
                {formattedStartTime} - {formattedEndTime}
                <br />
                <div className="edit-show-description">
                  Edit Show Description
                </div>
              </div>
            </div>

            <div className="show-builder__grid">
              {(playlist.loading || showFetching || traffic.loading) && (
                <Loading />
              )}
              <div>
                <h5>Scratchpad</h5>
                {!playlist.loading &&
                  !traffic.loading &&
                  typeof scratchpad !== 'undefined' && (
                    <ShowBuilderItemList
                      items={scratchpadForDisplay}
                      deleteButton={true}
                      toSavedItemsButton={true}
                    />
                  )}
              </div>
              <div>
                <h5>Saved Items</h5>
                {!playlist.loading &&
                  !traffic.loading &&
                  typeof saved_items !== 'undefined' && (
                    <ShowBuilderItemList
                      items={savedItemsForDisplay}
                      toScratchpadButton={true}
                    />
                  )}
              </div>

              <div className="library-tab-container">
                <div className="library-tab-container__tabs">
                  <div
                    className={activeTab === 'search' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: 'search' })}
                  >
                    Search
                  </div>
                  <div
                    className={activeTab === 'voice' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: 'voice' })}
                  >
                    Voice
                  </div>
                  <div
                    className={activeTab === 'comment' ? 'active' : ''}
                    onClick={() => this.setState({ activeTab: 'comment' })}
                  >
                    Comment
                  </div>
                </div>
                {activeTab === 'search' && (
                  <div className="library-tab-container__tab-content">
                    <form onSubmit={handleSubmit(this.searchLibrary)}>
                      <Field
                        className="mb-1"
                        component={Input}
                        label="Search"
                        name="q"
                        type="text"
                      />
                    </form>
                    {library.docs != null && library.docs.length > 0 && (
                      <div className="library-results">
                        <table className="base-table-style">
                          {this.renderLibraryResultsHeader()}
                          {this.renderLibraryResultsBody()}
                        </table>
                        <span
                          onClick={this.addTrackModalOpen}
                          className="library-results__add-new-track"
                        >
                          Add New Track
                        </span>
                      </div>
                    )}
                    {library.docs != null && library.docs.length === 0 && (
                      <div className="library-results__no-results">
                        <em>
                          There were no tracks found matching your search.
                        </em>
                        <br />
                        <br />
                        <span
                          onClick={this.addTrackModalOpen}
                          className="library-results__add-new-track"
                        >
                          Add New Track
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'voice' && (
                  <div className="library-tab-container__tab-content">
                    Voice content
                  </div>
                )}
                {activeTab === 'comment' && (
                  <div className="library-tab-container__tab-content">
                    <FormShowBuilderComment />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add Track Modal */}
          {showAddTrackModal ? (
            <Modal isOpen={true}>
              <div className="add-track-modal">
                {addTrackModalCurrentPage === 'album' && (
                  <div>
                    <form
                      onSubmit={handleSubmit(
                        this.addTrackModalSelectExistingAlbum,
                      )}
                    >
                      <h3>Select an existing album:</h3>
                      <DropdownLibrary
                        libraryType="album"
                        name="existingAlbum"
                        onLibraryItemSelect={
                          this.addTrackModalHandleAlbumSelect
                        }
                      />
                      <Button type="submit">Next</Button>
                    </form>

                    <h3>Or, create a new album:</h3>
                    <FormAlbumAdd
                      submitCallback={this.addTrackModalAddNewAlbum}
                    />
                  </div>
                )}
                {addTrackModalCurrentPage === 'track' && (
                  <div>
                    <h3>New Track</h3>
                    <FormTrackAdd
                      maxDiskNumber={maxDiskNumber}
                      maxTrackNumber={maxTrackNumber}
                      customSubmitButtons={[
                        {
                          text: 'Save and Add to Scratchpad',
                          callback: this.addTrackModalAddToScratchpad,
                        },
                        {
                          text: 'Save and Add to Saved Items',
                          callback: this.addTrackModalAddToSavedItems,
                        },
                      ]}
                      albumId={this.state.addTrackModalSelectedAlbum._id}
                      artistId={
                        this.state.addTrackModalSelectedAlbum.artist._id
                      }
                      artist={this.state.addTrackModalSelectedAlbum.artist}
                    />
                  </div>
                )}
                <Button color="neutral" onClick={this.addTrackModalClose}>
                  Close
                </Button>
              </div>
            </Modal>
          ) : null}
        </CardBody>
      </Card>
    );
  }

  renderLibraryResultsHeader = () => {
    return (
      <thead>
        <tr>
          <th>Track Name</th>
          <th>Artist</th>
          <th>Album</th>
          <th />
        </tr>
      </thead>
    );
  };

  renderLibraryResultsBody = () => {
    const { docs } = this.props.library;

    return (
      <tbody>
        {docs.map(item => {
          return (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.artists.map(a => a.name).join(', ')}</td>
              <td>{item.album != null && item.album.name}</td>
              <td>
                <div onClick={this.stopPropagation}>
                  <Dropdown
                    position="bottom-left"
                    type="icon"
                    faClass="fas fa-ellipsis-h"
                  >
                    <Dropdown.Item
                      handleOnClick={() => this.addTrackToScratchpad(item._id)}
                    >
                      Add to Scratchpad
                    </Dropdown.Item>
                    <Dropdown.Item
                      handleOnClick={() => this.addTrackToSavedItems(item._id)}
                    >
                      Add to Saved Items
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };
}

function mapStateToProps({ library, show, playlist, traffic }) {
  return {
    library,
    playlist,
    showFetching: show.fetching,
    shows: getShowsData(show),
    traffic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
    playlistActions: bindActionCreators({ ...playlistActions }, dispatch),
    clearShows: bindActionCreators(clearShows, dispatch),
    createInstanceShow: bindActionCreators(createInstanceShow, dispatch),
    searchShow: bindActionCreators(searchShow, dispatch),
    updateShow: bindActionCreators(updateShow, dispatch),
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

const ReduxShowBuilderPage = reduxForm({
  form: 'showBuilder',
})(ShowBuilderPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxShowBuilderPage);
