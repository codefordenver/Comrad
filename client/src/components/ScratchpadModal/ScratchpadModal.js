import React, { Component } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import moment from 'moment';
import { libraryActions } from '../../redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showAPI } from '../../api';
import ShowListForUser from '../ShowListForUser';

class ScratchpadModal extends Component {
  componentWillMount() {
    const userId = this.props.doc._id;
    console.log(userId);
    // if (currentUserId != null) {
    //   this.findShows();
    // }
  }
  render() {
    const { closeScratchpadModal } = this.props;
    const today = moment();
    const todayPlus3Months = moment().add('3', 'month');
    const oneYearAgo = moment().subtract('1', 'year');
    console.log(this.props);
    return (
      <Modal isOpen={true}>
        <div className="library-search__scratchpad-modal">
          Please select the show scratchpad you would like to add this track to.
          <ShowListForUser
            maxItems="5"
            startDate={today}
            endDate={todayPlus3Months}
            noItemsText="You have no upcoming shows in the next three months."
          />
          <Button
            color="neutral"
            onClick={closeScratchpadModal}
            className="ml-1"
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps({ auth }) {
  return auth;
}

// function mapDispatchToProps(dispatch) {
//     return {
//       libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
//     };
//   }

export default connect(
  mapStateToProps,
  //mapDispatchToProps,
)(ScratchpadModal);
