import React, { Component } from 'react';
import moment from 'moment';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ShowBuilderItem from './ShowBuilderItem';

export default class ShowBuilderItemList extends Component {
  onRearrangeShowBuilderItem = (fromIndex, toIndex) => {
    const { onRearrangeItem } = this.props;
    if (typeof onRearrangeItem === 'function') {
      onRearrangeItem(fromIndex, toIndex);
    }
  };

  onFinishRearrangeShowBuilderItem = (itemId, toIndex) => {
    const { onFinishRearrangeShowBuilderItem } = this.props;
    if (typeof onFinishRearrangeShowBuilderItem === 'function') {
      onFinishRearrangeShowBuilderItem(itemId, toIndex);
    }
  };

  render() {
    const {
      onRearrangeShowBuilderItem,
      onFinishRearrangeShowBuilderItem,
    } = this;
    const { items } = this.props;

    const buttonProps = {
      deleteButton: this.props.deleteButton,
      toSavedItemsButton: this.props.toSavedItemsButton,
      toScratchpadButton: this.props.toScratchpadButton,
    };

    let elements = [];
    items.forEach(function(item, idx) {
      switch (item.type) {
        case 'track':
          let trackName = item.track != null ? item.track.name : '';
          let artists =
            item.track != null
              ? item.track.artists.map(function(artist) {
                  return artist.name;
                })
              : [];
          artists = artists.join(',');
          elements.push(
            <ShowBuilderItem
              key={idx}
              index={idx}
              itemId={item._id}
              onRearrangeShowBuilderItem={onRearrangeShowBuilderItem}
              onFinishRearrangeShowBuilderItem={
                onFinishRearrangeShowBuilderItem
              }
              {...buttonProps}
              eventType="track"
            >
              {item.track != null ? (
                <>
                  <b>Track:</b> <i>{trackName}</i> by <i>{artists}</i>
                </>
              ) : (
                <>
                  <b>Track:</b> <i>Track data missing from database</i>
                </>
              )}
            </ShowBuilderItem>,
          );
          break;
        case 'traffic':
          if (item.traffic == null || typeof item.traffic === 'undefined') {
            console.error('Missing traffic event for item: ');
            console.error(item);
            return <></>;
          }
          let traffic = item.traffic;
          let trafficTime = moment(traffic.start_time_utc);
          let formattedTime = trafficTime.format('LT');
          let eventType = traffic.traffic_details.type
            .replace(/\s/g, '')
            .toLowerCase();
          elements.push(
            <ShowBuilderItem
              key={idx}
              index={idx}
              itemId={item._id}
              masterTimeId={item.traffic.master_time_id}
              onRearrangeShowBuilderItem={onRearrangeShowBuilderItem}
              onFinishRearrangeShowBuilderItem={
                onFinishRearrangeShowBuilderItem
              }
              deleteButton={false}
              eventType={eventType}
              {...buttonProps}
            >
              {formattedTime} - <b>{traffic.traffic_details.type}:</b>{' '}
              {traffic.traffic_details.title}
            </ShowBuilderItem>,
          );
          break;
        case 'comment':
          elements.push(
            <ShowBuilderItem
              key={idx}
              index={idx}
              itemId={item._id}
              onRearrangeShowBuilderItem={onRearrangeShowBuilderItem}
              onFinishRearrangeShowBuilderItem={
                onFinishRearrangeShowBuilderItem
              }
              eventType="comment"
              {...buttonProps}
            >
              Comment
            </ShowBuilderItem>,
          );
          break;
        case 'voice_break':
          elements.push(
            <ShowBuilderItem
              key={idx}
              index={idx}
              itemId={item._id}
              onRearrangeShowBuilderItem={onRearrangeShowBuilderItem}
              onFinishRearrangeShowBuilderItem={
                onFinishRearrangeShowBuilderItem
              }
              eventType="voice_break"
              {...buttonProps}
            >
              Voice Break
            </ShowBuilderItem>,
          );
          break;
        default:
          console.warn(
            'ShowBuilderItemList does not know how to display type ' +
              item.type,
          );
      }
    });

    return (
      <div className="show-builder-item-list">
        <DndProvider backend={HTML5Backend}>{elements}</DndProvider>
      </div>
    );
  }
}
