import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import FormTrackAdd from '../../components/FormTrackAdd';

class TrackAddPage extends Component {
  addTrackCallback = id => {
    this.props.history.push('/library/album/' + id);
  };

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <h1>Add Track to Album</h1>
            <FormTrackAdd submitCallback={this.addTrackCallback} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TrackAddPage;
