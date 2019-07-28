import React, { Component } from 'react';
import moment from 'moment';

export default class ShowBuilderItemList extends Component {
  render() {
    const { items } = this.props;

    let elements = [];
    items.forEach(function(item, idx) {
      switch (item.type) {
        case 'track':
          let trackName = item.track.name;
          let artists = item.track.artists.map(function(artist) {
            return artist.name;
          });
          artists = artists.join(',');
          elements.push(
            <div key={idx}>
              <b>Track:</b> <i>{trackName}</i> by <i>{artists}</i>
            </div>,
          );
          break;
        case 'traffic':
          let traffic = item.traffic;
          let trafficTime = moment(traffic.start_time_utc);
          let formattedTime = trafficTime.format('LT');
          elements.push(
            <div key={idx}>
              {formattedTime} - <b>{traffic.traffic_details.type}:</b>{' '}
              {traffic.traffic_details.title}
            </div>,
          );
          break;
        case 'comment':
          elements.push(<div key={idx}>Comment</div>);
          break;
        case 'voice_break':
          elements.push(<div key={idx}>Voice Break</div>);
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
