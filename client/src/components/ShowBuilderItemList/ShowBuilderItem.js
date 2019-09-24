import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playlistActions } from '../../redux';
import classnames from 'classnames';

import Button from '../Button';

const SHOW_BUILDER_ITEM_TYPE = 'show_builder_item';

const ShowBuilderItem = props => {
  const {
    children,
    deleteButton,
    eventType,
    index,
    itemId,
    masterTimeId,
    onRearrangeShowBuilderItem,
    onFinishRearrangeShowBuilderItem,
    playlist,
    playlistActions,
    toSavedItemsButton,
    toScratchpadButton,
  } = props;

  const handleDelete = () => {
    playlistActions.deleteItemFromScratchpad(playlist.doc._id, itemId);
  };

  const handleToSavedItems = () => {
    if (typeof masterTimeId !== 'undefined') {
      playlistActions.addTrafficToSavedItems(playlist.doc._id, masterTimeId);
    } else {
      playlistActions.moveItemFromScratchpadToSavedItems(
        playlist.doc._id,
        itemId,
      );
    }
  };

  const handleToScratchpad = () => {
    playlistActions.moveItemFromSavedItemsToScratchpad(
      playlist.doc._id,
      itemId,
    );
  };

  // START - drag and drop functionality
  //based on http://react-dnd.github.io/react-dnd/examples/sortable/simple
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: SHOW_BUILDER_ITEM_TYPE,
    drop(item, monitor) {
      onFinishRearrangeShowBuilderItem(item.itemId, item.index);
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      onRearrangeShowBuilderItem(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: SHOW_BUILDER_ITEM_TYPE, itemId, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  // END - drag and drop functionality

  return (
    <div
      ref={ref}
      className={classnames(
        'show-builder-item',
        `show-builder-item--${eventType}`,
        isDragging ? 'show-builder-item--dragging' : '',
      )}
    >
      {toScratchpadButton && (
        <Button
          type="button"
          color="neutral"
          className="button--to-scratchpad"
          onClick={handleToScratchpad}
        >
          &lt;
        </Button>
      )}
      {children}
      {toSavedItemsButton && (
        <Button type="button" color="success" onClick={handleToSavedItems}>
          &gt;
        </Button>
      )}
      {deleteButton && (
        <Button type="button" color="danger" onClick={handleDelete}>
          X
        </Button>
      )}
    </div>
  );
};

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
