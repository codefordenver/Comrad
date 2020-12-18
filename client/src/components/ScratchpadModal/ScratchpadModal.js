import React, { Component } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { libraryActions } from '../../redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showAPI } from '../../api';

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
    console.log(this.props);
    return (
      <Modal isOpen={true}>
        <Button color="neutral" onClick={closeScratchpadModal} className="ml-1">
          Close
        </Button>
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
