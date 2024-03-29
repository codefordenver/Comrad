import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import FormTrackAdd from '../../components/forms/FormTrackAdd';

import { libraryActions, alertActions } from '../../redux';

import { getNextDiskAndTrackNumberForAlbum } from '../../utils/library';

class TrackAddPage extends Component {
  componentWillMount() {
    const { library, libraryActions, match } = this.props;
    const { id } = match.params;

    if (library.doc == null || id !== library.doc._id) {
      libraryActions.findOne(id);
    }
  }

  addTrackCallback = trackData => {
    const { alertActions, history } = this.props;
    history.push(`/library/album/${trackData.album._id}`);
    alertActions.show(
      'success',
      'Success',
      "'" + trackData.name + "' has been added",
    );
  };

  render() {
    let name, _id, artist;
    if (this.props.library.doc != null) {
      ({ name, _id, artist } = this.props.library.doc);
    }
    const artistId = artist == null ? null : artist._id;
    let { maxDiskNumber, maxTrackNumber } =
      this.props.library.doc != null
        ? getNextDiskAndTrackNumberForAlbum(this.props.library.doc)
        : { maxDiskNumber: 1, maxTrackNumber: 1 };

    return (
      <div className="track-add-page">
        <Card>
          <CardBody>
            <h1>Add Track to Album</h1>
            <h2 className="track-add-page__album-name mb-0">Album: {name}</h2>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            {!_id && <Loading />}
            {_id && (
              <>
                <FormTrackAdd
                  maxDiskNumber={maxDiskNumber}
                  maxTrackNumber={maxTrackNumber}
                  submitCallback={this.addTrackCallback}
                  albumId={_id}
                  artistId={artistId}
                  artist={artist}
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
