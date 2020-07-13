import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { configActions } from '../../redux';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Button from '../Button';
import ShowBuilderItem from './ShowBuilderItem';

import { stripHtml } from '../../utils/formatters';

class ShowBuilderItemList extends Component {
  componentWillMount() {
    const { configState, configActions } = this.props;

    if (!('giveaway' in configState.customFields)) {
      configActions.customFieldsForModel('giveaway');
    }
  }

  onRearrangeShowBuilderItem = (fromIndex, toIndex, itemBeingMoved) => {
    const { items, onRearrangeItem } = this.props;
    if (typeof onRearrangeItem === 'function') {
      onRearrangeItem(fromIndex, toIndex, itemBeingMoved, items[toIndex]);
    }
  };

  onFinishRearrangeShowBuilderItem = (itemId, toIndex) => {
    const { onFinishRearrangeShowBuilderItem } = this.props;
    if (typeof onFinishRearrangeShowBuilderItem === 'function') {
      onFinishRearrangeShowBuilderItem(itemId, toIndex);
    }
  };

  urlParametersForCustomGiveawayProperties = traffic => {
    const { configState } = this.props;

    let urlParameters = '';

    if (
      'giveaway' in configState.customFields &&
      traffic.traffic_details.giveaway_details.custom != null
    ) {
      configState.customFields.giveaway.forEach(function(cf) {
        if (cf.name in traffic.traffic_details.giveaway_details.custom) {
          urlParameters +=
            '&' +
            cf.jotformUrlParameter +
            '=' +
            encodeURIComponent(
              traffic.traffic_details.giveaway_details.custom[cf.name],
            );
        }
      });
    }

    return urlParameters;
  };

  render() {
    const {
      onRearrangeShowBuilderItem,
      onFinishRearrangeShowBuilderItem,
      urlParametersForCustomGiveawayProperties,
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
          let albumName =
            item.track != null && item.track.album != null
              ? item.track.album.name
              : null;
          let label =
            item.track != null && item.track.album != null
              ? item.track.label
              : null;
          let canExpand = albumName != null || label != null;
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
              titleHtml={
                item.track != null
                  ? `<b>Track:</b> <i>${trackName}</i> by <i>${artists}</i>`
                  : `<b>Track:</b> <i>Track data missing from database</i>`
              }
              canExpand={canExpand}
            >
              {albumName != null && (
                <div>
                  <b>Album:</b> {albumName}
                </div>
              )}
              {label != null && (
                <div>
                  <b>Label:</b> {label}
                </div>
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
          if (
            traffic.traffic_details.type === null ||
            typeof traffic.traffic_details.type === 'undefined'
          ) {
            console.error('Traffic event is missing its type: ');
            console.error(traffic);
            return <></>;
          }
          let eventType = traffic.traffic_details.type
            .replace(/\s/g, '')
            .toLowerCase();
          elements.push(
            <ShowBuilderItem
              key={idx}
              index={idx}
              itemId={item._id != null ? item._id : item.traffic._id}
              masterTimeId={item.traffic.master_time_id}
              onRearrangeShowBuilderItem={onRearrangeShowBuilderItem}
              onFinishRearrangeShowBuilderItem={
                onFinishRearrangeShowBuilderItem
              }
              isTraffic={true}
              eventType={eventType}
              canExpand={true}
              titleHtml={
                formattedTime +
                ' - <b>' +
                traffic.traffic_details.type +
                ':</b> ' +
                traffic.traffic_details.title
              }
              {...buttonProps}
              deleteButton={false}
            >
              {/* regex below is to replace HTML tags */}
              {traffic.traffic_details.description
                .replace(/<(.*?)>/gi, '')
                .trim().length > 0 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: traffic.traffic_details.description,
                  }}
                />
              )}
              {traffic.traffic_details.description
                .replace(/<(.*?)>/gi, '')
                .trim().length === 0 && (
                <div>
                  <i>There are no additional details for this traffic event.</i>
                </div>
              )}
              {traffic.traffic_details.type === 'Giveaway' && (
                <>
                  <Button
                    color="neutral"
                    href={
                      process.env.REACT_JOTFORM_GIVEAWAY_WINNER_FORM_URL +
                      '?venue=' +
                      encodeURIComponent(
                        traffic.traffic_details.giveaway_details.venue,
                      ) +
                      '&showArtist=' +
                      encodeURIComponent(
                        traffic.traffic_details.giveaway_details.event_name,
                      ) +
                      '&showInfo=' +
                      encodeURIComponent(
                        stripHtml(traffic.traffic_details.description),
                      ) +
                      '&showTime=' +
                      encodeURIComponent(
                        traffic.traffic_details.giveaway_details.event_time,
                      ) +
                      '&showDate=' +
                      encodeURIComponent(
                        moment(
                          traffic.traffic_details.giveaway_details.event_date,
                        ).format('L'),
                      ) +
                      urlParametersForCustomGiveawayProperties(traffic)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enter Winner Details
                  </Button>
                </>
              )}
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
              titleHtml="Comment"
              canExpand={true}
              {...buttonProps}
            >
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
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
              titleHtml="Voice Break"
            ></ShowBuilderItem>,
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

function mapStateToProps({ config }) {
  return { configState: config };
}

function mapDispatchToProps(dispatch) {
  return {
    configActions: bindActionCreators({ ...configActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowBuilderItemList);
