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
import FormAlbumLabelEdit from '../../components/forms/FormAlbumLabelEdit';
import FormTrackAdd from '../../components/forms/FormTrackAdd';
import FormShowBuilderComment from '../../components/forms/FormShowBuilderComment';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import ShowBuilderItemList from '../../components/ShowBuilderItemList';

import { MODAL_EDIT_SHOW_INSTANCE_DESCRIPTION } from '../../components/Shows/ShowModalController';
import { setModalVisibility } from '../../redux/modal';
import ShowModalController from '../../components/Shows/ShowModalController';

import {
  alertActions,
  configActions,
  libraryActions,
  playlistActions,
  trafficActions,
} from '../../redux';

import {
  clearShows,
  createInstanceShow,
  getShowsData,
  searchShow,
  selectShow,
  updateShow,
} from '../../redux/show';

import { formatHostName } from '../../utils/formatters';
import { getShowType } from '../../utils/shows';
import { getNextDiskAndTrackNumberForAlbum } from '../../utils/library';

class ShowBuilderPage extends Component {
  state = {
    activeTab: 'search',
    scratchpadUpdatestoIndex: null,
    scratchpadPropertiesToUpdate: {},
    showAddTrackModal: false,
    showPromptForLabelModal: false,
  };

  componentDidMount() {
    const {
      location,
      searchShow,
      configActions,
      libraryActions,
      playlistActions,
      trafficActions,
    } = this.props;
    const { startTime, endTime } = queryString.parse(location.search);

    //get the settings for whether we are in a compliance reporting period
    configActions.getInComplianceReportingPeriodSetting();

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
    const { alertActions } = this.props;
    alertActions.hideWithoutChangingDisplayLocation();
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
    this.checkIfTracksAlbumNeedsLabel(track, this.addTrackToScratchpad);
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
    const { alertActions, library } = this.props;
    alertActions.hideWithoutChangingDisplayLocation();
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
    const { alertActions } = this.props;
    alertActions.changeDisplayLocation('modal');
    this.setState({
      addTrackModalCurrentPage: 'album',
      showAddTrackModal: true,
    });
  };

  /* END - add track modal */

  /* START - in compliance reporting periods, prompt the user for the album's label */

  promptForLabelModalClose = () => {
    const { libraryActions } = this.props;
    libraryActions.clear(); //clear the library search results since the underlying data has changed
    this.setState({
      showPromptForLabelModal: false,
    });
  };

  promptForLabelModalOpen = (track, callback) => {
    this.setState({
      showPromptForLabelModal: true,
      promptForLabelModalAlbumId: track.album._id,
      promptForLabelModalAlbumName: track.album.name,
      promptForLabelModalTrackId: track._id,
      promptForLabelModalCallback: callback,
    });
  };

  /* END - in compliance reporting periods, prompt the user for the album's label */

  addTrackToSavedItems = trackId => {
    const { playlist, playlistActions } = this.props;
    playlistActions.addTrackToSavedItems(playlist.doc._id, trackId);
  };

  addTrackToScratchpad = trackId => {
    const { playlist, playlistActions } = this.props;
    playlistActions.addTrackToScratchpad(playlist.doc._id, trackId);
  };

  checkIfTracksAlbumNeedsLabel = (track, callback) => {
    const { config } = this.props;
    //if we are in a compliance reporting period, prompt the user for the label of the album
    if (
      config.inComplianceReportingPeriod &&
      (typeof track.album.label === 'undefined' ||
        track.album.label === null ||
        track.album.label.length === 0)
    ) {
      this.promptForLabelModalOpen(track, callback);
    } else {
      callback(track._id);
    }
  };

  // combines the scratchpad and traffic documents into one list
  getScratchpadCombinedWithNonexecutedTraffic = () => {
    const { playlist, traffic } = this.props;
    let { scratchpad, saved_items } = playlist.doc;
    let scratchpadForDisplay = [];
    //modify the scratchpad list based on what traffic occurs at the time period
    //we will add any traffic items not accounted for to scratchpad
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
    let scratchpadIndex = 0;
    scratchpad.forEach(s => {
      if (typeof s === 'undefined' || s == null) {
        console.error('Empty item in scratchpad list, skipping...');
        return;
      }
      if (!s.occurs_after_time_utc && !s.occurs_before_time_utc) {
        scratchpadForDisplay.push(s); // item goes at the end
        scratchpadIndex = scratchpadForDisplay.length;
      } else {
        // add the scratchpad item at a particular index based on the time values
        if (scratchpadIndex > scratchpadForDisplay.length) {
          console.error(
            'Scratchpad has items with occurs_after_time_utc or occurs_before_time_utc after items that do not have it set, scratchpad items may not display correctly.',
          );
          scratchpadForDisplay.push(s); // item goes at the end
          scratchpadIndex = scratchpadForDisplay.length;
        } else {
          for (let i = scratchpadIndex; i < scratchpadForDisplay.length; i++) {
            if (scratchpadForDisplay[i].type === 'traffic') {
              let traffic = scratchpadForDisplay[i].traffic;
              if (
                s.occurs_before_time_utc &&
                traffic.start_time_utc >= s.occurs_before_time_utc
              ) {
                scratchpadIndex = i; // insert right before this item
                break;
              } else if (
                s.occurs_after_time_utc &&
                traffic.start_time_utc > s.occurs_after_time_utc
              ) {
                scratchpadIndex = i; // insert right before this item
                break;
              }
            }
            scratchpadIndex = i + 1;
          }
          scratchpadForDisplay.splice(scratchpadIndex, 0, s);
          scratchpadIndex++;
        }
      }
    });
    return scratchpadForDisplay;
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

  handleFinishRearrangeSavedItem = (itemId, toIndex) => {
    //rearrange the saved item in the database
    const { playlist, playlistActions } = this.props;
    const savedItemsLength = playlist.doc.saved_items.length; //saved items is displayed in reverse, so we'll have to calculate the position in Redux based on the displayed index
    playlistActions.finishRearrangeSavedItem(
      playlist.doc._id,
      itemId,
      savedItemsLength - 1 - toIndex,
    );
  };

  handleRearrangeSavedItem = (fromIndex, toIndex) => {
    //rearrange the UI of the saved item
    const { playlist, playlistActions } = this.props;
    const savedItemsLength = playlist.doc.saved_items.length; //saved items is displayed in reverse, so we'll have to calculate the position in Redux based on the displayed index
    playlistActions.rearrangeSavedItem(
      playlist.doc._id,
      savedItemsLength - 1 - fromIndex,
      savedItemsLength - 1 - toIndex,
    );
  };

  handleRearrangeScratchpadItem = (
    fromIndex,
    toIndex,
    itemBeingMoved,
    itemBeingReplaced,
  ) => {
    //rearrange the scratchpad item in the UI
    const { playlist, playlistActions, traffic } = this.props;
    const { scratchpad } = playlist.doc;
    if (itemBeingReplaced.type === 'traffic' && itemBeingMoved.isTraffic) {
      // do nothing
    } else if (itemBeingReplaced.type === 'traffic') {
      let propertiesToUpdate = {
        occurs_after_time_utc: null,
        occurs_before_time_utc: null,
      };
      if (fromIndex > toIndex) {
        propertiesToUpdate.occurs_before_time_utc =
          itemBeingReplaced.traffic.start_time_utc;
        //see if there is a previous traffic event so we can set occurs_after_time_utc
        let foundTrafficEvent = false;
        let reversedTrafficDocs = [...traffic.docs];
        reversedTrafficDocs = reversedTrafficDocs.reverse();
        reversedTrafficDocs.forEach(item => {
          if (foundTrafficEvent) {
            propertiesToUpdate.occurs_after_time_utc = item.start_time_utc;
            foundTrafficEvent = false;
          } else if (item._id === itemBeingReplaced._id) {
            foundTrafficEvent = true;
          }
        });
      } else {
        propertiesToUpdate.occurs_after_time_utc =
          itemBeingReplaced.traffic.start_time_utc;
        let foundTrafficEvent = false;
        traffic.docs.forEach(item => {
          if (foundTrafficEvent) {
            propertiesToUpdate.occurs_before_time_utc = item.start_time_utc;
            foundTrafficEvent = false;
          } else if (item._id === itemBeingReplaced._id) {
            foundTrafficEvent = true;
          }
        });
      }
      playlistActions.updateScratchpadItem(
        playlist.doc._id,
        itemBeingMoved.itemId,
        propertiesToUpdate,
      );
      this.setState({ scratchpadPropertiesToUpdate: propertiesToUpdate });
    } else if (itemBeingMoved.isTraffic) {
      let trafficItem = traffic.docs.filter(
        t => t._id === itemBeingMoved.itemId,
      )[0];
      let propertiesToUpdate = {
        occurs_after_time_utc: null,
        occurs_before_time_utc: null,
      };
      if (fromIndex < toIndex) {
        propertiesToUpdate.occurs_before_time_utc = trafficItem.start_time_utc;
      } else {
        propertiesToUpdate.occurs_after_time_utc = trafficItem.start_time_utc;
      }
      playlistActions.updateScratchpadItem(
        playlist.doc._id,
        itemBeingReplaced._id,
        propertiesToUpdate,
      );
      this.setState({ scratchpadPropertiesToUpdate: propertiesToUpdate });
    } else {
      // make this use the toIndex/fromIndex among all non-traffic items
      let toIndexAmongScratchpad, fromIndexAmongScratchpad;
      scratchpad.forEach(function(item, idx) {
        if (item != null) {
          if (item._id === itemBeingMoved.itemId) {
            fromIndexAmongScratchpad = idx;
          } else if (item._id === itemBeingReplaced._id) {
            toIndexAmongScratchpad = idx;
          }
        }
      });
      playlistActions.rearrangeScratchpadItem(
        playlist.doc._id,
        toIndexAmongScratchpad,
        fromIndexAmongScratchpad,
      );
      this.setState({ scratchpadToIndex: toIndexAmongScratchpad });
    }
  };

  handleFinishRearrangeScratchpadItem = (itemId, toIndex) => {
    //rearrange the scratchpad item in the database
    const { playlist, playlistActions } = this.props;
    playlistActions.finishRearrangeScratchpadItem(
      playlist.doc._id,
      itemId,
      this.state.scratchpadUpdatesToIndex,
      this.state.scratchpadPropertiesToUpdate,
    );
    this.setState({
      scratchpadUpdatestoIndex: null,
      scratchpadPropertiesToUpdate: {},
    });
  };

  searchLibrary = form => {
    const { libraryActions } = this.props;
    if (form.q.length === 0) {
      libraryActions.clear();
    } else {
      libraryActions.search('track', form.q, null, null, 20);
    }
  };

  showEditShowDescriptionModal = () => {
    const { setModalVisibility, selectShow, shows } = this.props;
    let show = shows[Object.keys(shows)[0]];

    selectShow(show);
    setModalVisibility(MODAL_EDIT_SHOW_INSTANCE_DESCRIPTION, true, null);
  };

  render() {
    const {
      auth,
      handleSubmit,
      library,
      playlist,
      playlistActions,
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
    let formattedHostName;
    if (shows && Object.keys(shows).length > 0) {
      if (Object.keys(shows).length > 1) {
        console.warn(
          'More than one show returned for show builder, using the first one',
        );
      }
      let show = shows[Object.keys(shows)[0]];
      showName = show.show_details.title;
      host = show.show_details.host;
      if (host != null) {
        formattedHostName = formatHostName(host);
      }
    }

    let scratchpadForDisplay = [];
    let savedItemsForDisplay = [];

    if (
      !traffic.loading &&
      !playlist.loading &&
      typeof scratchpad !== 'undefined' &&
      typeof saved_items !== 'undefined'
    ) {
      scratchpadForDisplay = this.getScratchpadCombinedWithNonexecutedTraffic();
    }

    if (typeof saved_items !== 'undefined') {
      savedItemsForDisplay = [...saved_items];
      savedItemsForDisplay.reverse(); //display saved items in reverse chronological order
    }

    let canEditPlaylist =
      auth.doc.roles.indexOf('Admin') !== -1 ||
      auth.doc.roles.indexOf('Full Access') !== -1 ||
      auth.doc.roles.indexOf('Music Library Admin') !== -1 ||
      (auth.doc.roles.indexOf('DJ') !== -1 &&
        host != null &&
        host._id === auth.doc._id);

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
                  <>
                    {(auth.doc.roles.indexOf('Admin') !== -1 ||
                      auth.doc.roles.indexOf('Full Access') !== -1 ||
                      auth.doc.roles.indexOf('Music Library Admin') !== -1) && (
                      <DropdownHost
                        key={host != null ? host._id : 'no host'}
                        host={host}
                        onHostSelect={this.handleHostSelect}
                        filterByStatus="Active"
                      />
                    )}
                    {auth.doc.roles.indexOf('Admin') === -1 &&
                      auth.doc.roles.indexOf('Full Access') === -1 &&
                      auth.doc.roles.indexOf('Music Library Admin') === -1 && (
                        <>
                          <b>Host:</b> {formattedHostName}
                        </>
                      )}
                  </>
                )}
              </div>
              <div>{showName}</div>
              <div>
                {formattedDay}
                <br />
                {formattedStartTime} - {formattedEndTime}
                <br />
                {canEditPlaylist && (
                  <div className="edit-show-description">
                    <span onClick={e => this.showEditShowDescriptionModal()}>
                      Edit Show Description
                    </span>

                    <ShowModalController />
                  </div>
                )}
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
                      deleteButton={canEditPlaylist}
                      toSavedItemsButton={canEditPlaylist}
                      onRearrangeItem={this.handleRearrangeScratchpadItem}
                      onFinishRearrangeShowBuilderItem={
                        this.handleFinishRearrangeScratchpadItem
                      }
                    />
                  )}
              </div>
              <div className="show-builder__grid__saved-items">
                <h5>Saved Items</h5>
                {!playlist.loading &&
                  !traffic.loading &&
                  typeof saved_items !== 'undefined' && (
                    <ShowBuilderItemList
                      items={savedItemsForDisplay}
                      toScratchpadButton={canEditPlaylist}
                      onRearrangeItem={this.handleRearrangeSavedItem}
                      onFinishRearrangeShowBuilderItem={
                        this.handleFinishRearrangeSavedItem
                      }
                    />
                  )}
              </div>

              {canEditPlaylist && (
                <div className="library-tab-container">
                  <div className="library-tab-container__tabs">
                    <div
                      className={activeTab === 'search' ? 'active' : ''}
                      onClick={() => this.setState({ activeTab: 'search' })}
                    >
                      Search
                    </div>
                    <div
                      className={activeTab === 'comment' ? 'active' : ''}
                      onClick={() => this.setState({ activeTab: 'comment' })}
                    >
                      Comment
                    </div>
                    <div className="library-tab-container__voice-break-button">
                      <Dropdown
                        position="right-centered"
                        type="button"
                        text="Voice Break"
                      >
                        <Dropdown.Item
                          handleOnClick={() =>
                            playlistActions.addVoiceBreakToScratchpad(
                              playlist.doc._id,
                            )
                          }
                        >
                          Add to Scratchpad
                        </Dropdown.Item>
                        <Dropdown.Item
                          handleOnClick={() =>
                            playlistActions.addVoiceBreakToSavedItems(
                              playlist.doc._id,
                            )
                          }
                        >
                          Add to Saved Items
                        </Dropdown.Item>
                      </Dropdown>
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
                  {activeTab === 'comment' && (
                    <div className="library-tab-container__tab-content">
                      <FormShowBuilderComment />
                    </div>
                  )}
                </div>
              )}
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

          {/* Prompt for Label Modal */}
          {this.state.showPromptForLabelModal ? (
            <Modal isOpen={true}>
              <div className="prompt-for-label-modal">
                <div>
                  We are currently in a compliance reporting period. Please
                  provide the label for the album{' '}
                  <i>{this.state.promptForLabelModalAlbumName}</i>.
                </div>
                <FormAlbumLabelEdit
                  albumId={this.state.promptForLabelModalAlbumId}
                  submitCallback={() => {
                    this.state.promptForLabelModalCallback(
                      this.state.promptForLabelModalTrackId,
                    );
                    this.promptForLabelModalClose();
                  }}
                />
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
    const { addTrackToScratchpad, addTrackToSavedItems } = this;
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
                      handleOnClick={() =>
                        this.checkIfTracksAlbumNeedsLabel(
                          item,
                          addTrackToScratchpad,
                        )
                      }
                    >
                      Add to Scratchpad
                    </Dropdown.Item>
                    <Dropdown.Item
                      handleOnClick={() =>
                        this.checkIfTracksAlbumNeedsLabel(
                          item,
                          addTrackToSavedItems,
                        )
                      }
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

function mapStateToProps({ auth, config, library, show, playlist, traffic }) {
  return {
    auth,
    config,
    library,
    playlist,
    showFetching: show.fetching,
    shows: getShowsData(show),
    traffic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    configActions: bindActionCreators({ ...configActions }, dispatch),
    clearShows: bindActionCreators(clearShows, dispatch),
    createInstanceShow: bindActionCreators(createInstanceShow, dispatch),
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
    playlistActions: bindActionCreators({ ...playlistActions }, dispatch),
    searchShow: bindActionCreators(searchShow, dispatch),
    selectShow: bindActionCreators(selectShow, dispatch),
    setModalVisibility: bindActionCreators(setModalVisibility, dispatch),
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
