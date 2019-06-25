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
    //const { name, tracks, _id, artist } = this.props.track.doc;
    const { match } = this.props;
    const trackId = match.params.id;
    console.log(this.state);
    return (
      <div className="track-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Track</h1>
            {/*<h2 className="track-edit-page__album-name">Album: {name}</h2>*/}
            <FormTrackEdit
              submitCallback={this.editTrackCallback}
              history={this.props.history}
              id={trackId}
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
