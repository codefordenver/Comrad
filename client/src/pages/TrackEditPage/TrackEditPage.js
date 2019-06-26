import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormTrackEdit from '../../components/forms/FormTrackEdit';

class TrackEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match, track } = this.props;
    const trackId = match.params.id;
    const { name, track_number, duration_in_seconds, disk_number } = track.doc;
    return (
      <div className="track-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Track</h1>
            <FormTrackEdit
              submitCallback={this.editTrackCallback}
              history={this.props.history}
              id={trackId}
              name={name}
              track_number={track_number}
              duration_in_seconds={duration_in_seconds}
              disk_number={disk_number}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ track }) {
  return { track };
}

export default connect(mapStateToProps)(TrackEditPage);
