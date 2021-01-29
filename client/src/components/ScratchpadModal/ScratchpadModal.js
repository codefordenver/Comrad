import React, { Component } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import moment from 'moment';
import { playlistActions } from '../../redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ShowListForUser from '../ShowListForUser';

class ScratchpadModal extends Component {
  render() {
    const {
      closeScratchpadModal,
      trackId,
      addToScratchpadSuccess,
    } = this.props;
    const today = moment();
    const todayPlus3Months = moment().add('3', 'month');

    return (
      <Modal isOpen={true}>
        <div className="library-search__scratchpad-modal">
          Please select the show scratchpad you would like to add this track to.
          <ShowListForUser
            maxItems="5"
            startDate={today}
            endDate={todayPlus3Months}
            trackId={trackId}
            showAddToScratchpadButton={true}
            noItemsText="You have no upcoming shows in the next three months."
            addToScratchpadSuccess={addToScratchpadSuccess}
          />
          <Button
            color="neutral"
            onClick={closeScratchpadModal}
            className="ml-1 mt-1"
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators({ ...playlistActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScratchpadModal);
