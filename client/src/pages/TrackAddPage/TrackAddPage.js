import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import FormTrackAdd from '../../components/FormTrackAdd';

class TrackAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Card>
          <CardBody>
            <h1>Add Track to Album</h1>
            <h2>Album: </h2>
            <FormTrackAdd />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TrackAddPage;
