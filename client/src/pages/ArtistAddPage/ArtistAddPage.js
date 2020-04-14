import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card, { CardBody } from '../../components/Card';
import FormArtistAdd from '../../components/forms/FormArtistAdd';

import { alertActions } from '../../redux';

class ArtistAddPage extends Component {
  addArtistCallback = artistData => {
    const { alertActions, history } = this.props;
    history.push('/library/artist/' + artistData._id);
    alertActions.show(
      'success',
      'Success',
      "'" + artistData.name + "' has been created",
    );
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

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ArtistAddPage);
