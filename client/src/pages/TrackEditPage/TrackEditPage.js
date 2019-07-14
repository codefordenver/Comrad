import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import FormTrackEdit from '../../components/forms/FormTrackEdit';

import { trackActions, albumActions, alertActions } from '../../redux';

class TrackEditPage extends Component {
  componentWillMount() {
    const { track, trackActions, match } = this.props;
    const { id } = match.params;

    if (track.doc === null || id !== track.doc._id) {
      trackActions.findOne(id);
    }
  }

  editTrackCallback = trackData => {
    const { albumActions, alertActions, history } = this.props;
    albumActions.clear();
    history.push(`/library/album/${trackData.album._id}`);
    alertActions.show(
      'success',
      'Success',
      "'" + trackData.name + "' has been updated",
    );
  };

  render() {
    const { track } = this.props;
    return (
      <div className="track-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Track</h1>
            {track.loading && <Loading />}
            {track.doc !== null && !track.loading && (
              <FormTrackEdit
                submitCallback={this.editTrackCallback}
                history={this.props.history}
              />
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ track }) {
  return { track };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
    trackActions: bindActionCreators({ ...trackActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackEditPage);
