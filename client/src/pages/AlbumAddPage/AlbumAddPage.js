import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormAlbumAdd from '../../components/forms/FormAlbumAdd';

class AlbumAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //need to pass in artist id
    return (
      <div className="album-add-page">
        <Card>
          <CardBody>
            <h1>Add New Album</h1>
            <FormAlbumAdd
              submitCallback={this.addAlbumCallback}
              history={this.props.history}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ artist }) {
  return { artist };
}

export default connect(mapStateToProps)(AlbumAddPage);
