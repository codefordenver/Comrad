import React, { Component } from 'react';
import moment from 'moment';

import ShowBuilderItem from './ShowBuilderItem';

export default class ShowBuilderItemList extends Component {
  render() {
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
            <ShowBuilderItem key={idx} itemId={item._id} {...buttonProps}>
              <b>Track:</b> <i>{trackName}</i> by <i>{artists}</i>
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
          elements.push(
            <ShowBuilderItem
              key={idx}
              itemId={item._id}
              masterTimeId={item.traffic.master_time_id}
              {...buttonProps}
              deleteButton={false}
            >
              {formattedTime} - <b>{traffic.traffic_details.type}:</b>{' '}
              {traffic.traffic_details.title}
            </ShowBuilderItem>,
          );
          break;
        case 'comment':
          elements.push(
            <ShowBuilderItem key={idx} itemId={item._id} {...buttonProps}>
              Comment
            </ShowBuilderItem>,
          );
          break;
        case 'voice_break':
          elements.push(
            <ShowBuilderItem key={idx} itemId={item._id} {...buttonProps}>
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

    return <div className="show-builder-item-list">{elements}</div>;
  }
}
