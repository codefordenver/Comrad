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
    return (
      <div className="track-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Track</h1>
            <FormTrackEdit
              submitCallback={this.editTrackCallback}
              history={this.props.history}
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
