import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card, { CardBody } from '../../components/Card';
import FormArtistUpdateName from '../../components/FormArtistUpdateName';

class ArtistViewPage extends Component {
  render() {
    const { props } = this;

    return (
      <div className="artist-view-page">
        <Card>
          <CardBody>
            <FormArtistUpdateName {...props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ artist }) {
  return {
    artist,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ArtistViewPage);
