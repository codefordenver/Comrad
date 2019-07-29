import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playlistActions } from '../../redux';

import Button from '../Button';

class ShowBuilderItem extends Component {
  handleDelete = () => {
    const { itemId, playlist, playlistActions } = this.props;
    playlistActions.deleteItemFromScratchpad(playlist.doc._id, itemId);
  };

  handleToSavedItems = () => {
    const { itemId, playlist, playlistActions, masterTimeId } = this.props;
    if (typeof masterTimeId !== 'undefined') {
      playlistActions.addTrafficToSavedItems(playlist.doc._id, masterTimeId);
    } else {
      playlistActions.moveItemFromScratchpadToSavedItems(
        playlist.doc._id,
        itemId,
      );
    }
  };

  handleToScratchpad = () => {
    const { itemId, playlist, playlistActions } = this.props;
    playlistActions.moveItemFromSavedItemsToScratchpad(
      playlist.doc._id,
      itemId,
    );
  };

  render() {
    const {
      children,
      deleteButton,
      toSavedItemsButton,
      toScratchpadButton,
    } = this.props;

    return (
      <div className="show-builder-item">
        {toScratchpadButton && (
          <Button
            type="button"
            color="neutral"
            className="button--to-scratchpad"
            onClick={this.handleToScratchpad}
          >
            &lt;
          </Button>
        )}
        {children}
        {toSavedItemsButton && (
          <Button
            type="button"
            color="success"
            onClick={this.handleToSavedItems}
          >
            &gt;
          </Button>
        )}
        {deleteButton && (
          <Button type="button" color="danger" onClick={this.handleDelete}>
            X
          </Button>
        )}
      </div>
    );
  }
}

function mapStateToProps({ playlist }) {
  return { playlist };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators({ ...playlistActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowBuilderItem);
