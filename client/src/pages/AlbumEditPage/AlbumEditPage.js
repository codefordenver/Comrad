import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormAlbumEdit from '../../components/forms/FormAlbumEdit';

import { albumActions } from '../../redux';

class AlbumEditPage extends Component {
  componentWillMount() {
    const { album, albumActions, match } = this.props;
    const { _id } = album.doc;
    const { id } = match.params;

    if (id !== _id) {
      albumActions.findOne(id);
    }
  }

  render() {
    const { album, match } = this.props;
    const { _id } = album.doc;
    const { id } = match.params;

    return (
      <div className="album-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Album</h1>
            {id === _id && (
              <FormAlbumEdit
                submitCallback={this.editAlbumCallback}
                history={this.props.history}
              />
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ album }) {
  return { album };
}

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumEditPage);
