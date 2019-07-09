import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormAlbumEdit from '../../components/forms/FormAlbumEdit';

class TrackEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="album-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Album</h1>
            <FormAlbumEdit
              submitCallback={this.editAlbumCallback}
              history={this.props.history}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ album }) {
  return { album };
}

export default connect(mapStateToProps)(TrackEditPage);
