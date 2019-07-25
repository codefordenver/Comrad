import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import FormAlbumEdit from '../../components/forms/FormAlbumEdit';
import { albumActions, alertActions } from '../../redux';

class AlbumEditPage extends Component {
  componentDidMount() {
    const { album, albumActions, match } = this.props;
    const { id } = match.params;

    if (album.doc == null || id !== album.doc._id) {
      albumActions.findOne(id);
    }
  }

  editAlbumCallback = albumData => {
    const { albumActions, alertActions, history } = this.props;
    albumActions.clear();
    history.push(`/library/album/${albumData.id}`);
    alertActions.show(
      'success',
      'Success',
      "'" + albumData.name + "' has been updated",
    );
  };

  render() {
    const { album } = this.props;
    return (
      <div className="album-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Album</h1>
            {album.loading && <Loading />}
            {!album.loading && (
              <FormAlbumEdit submitCallback={this.editAlbumCallback} />
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
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumEditPage);
