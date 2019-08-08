import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import FormTrackAdd from '../../components/forms/FormTrackAdd';

import { libraryActions, alertActions } from '../../redux';

class TrackAddPage extends Component {
  componentWillMount() {
    const { library, libraryActions, match } = this.props;
    const { _id } = library.doc;
    const { id } = match.params;

    if (id !== _id) {
      libraryActions.findOne(id);
    }
  }

  addTrackCallback = trackData => {
    const { libraryActions, alertActions, history } = this.props;
    libraryActions.clear();
    history.push(`/library/album/${trackData.album._id}`);
    alertActions.show(
      'success',
      'Success',
      "'" + trackData.name + "' has been added",
    );
  };

  render() {
    const { name, tracks, _id, artist } = this.props.library.doc;
    const artistId = artist == null ? null : artist._id;
    let maxDiskNumber, maxTrackNumber;
    //if there are no existing tracks, default disk number is one and track number is 0 (the form will use track number + 1 as its default)
    maxDiskNumber = 1;
    maxTrackNumber = 0;
    if (tracks != null && tracks.length) {
      for (var key in tracks) {
        if (tracks[key].disk_number >= maxDiskNumber) {
          if (tracks[key].disk_number > maxDiskNumber) {
            maxDiskNumber = tracks[key].disk_number;
            maxTrackNumber = tracks[key].track_number;
          } else {
            maxTrackNumber = Math.max(maxTrackNumber, tracks[key].track_number);
          }
        }
      }
    }
    return (
      <div className="track-add-page">
        <Card>
          <CardBody>
            <h1>Add Track to Album</h1>
            {!_id && <Loading />}
            {_id && (
              <>
                <h2 className="track-add-page__album-name">Album: {name}</h2>
                <FormTrackAdd
                  maxDiskNumber={maxDiskNumber}
                  maxTrackNumber={maxTrackNumber}
                  submitCallback={this.addTrackCallback}
                  albumId={_id}
                  artistId={artistId}
                  tracks={tracks}
                  history={this.props.history}
                />
              </>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ library }) {
  return { library };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackAddPage);
