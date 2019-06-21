import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import FormArtistAdd from '../../components/forms/FormArtistAdd';

class ArtistAddPage extends Component {
  addArtistCallback = id => {
    this.props.history.push('/library/artist/' + id);
  };

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <h1>Add Artist</h1>
            <FormArtistAdd submitCallback={this.addArtistCallback} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ArtistAddPage;
