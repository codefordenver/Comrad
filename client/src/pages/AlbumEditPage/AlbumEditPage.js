import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import FormAlbumEdit from '../../components/forms/FormAlbumEdit';
import { libraryActions, alertActions } from '../../redux';

class AlbumEditPage extends Component {
  componentDidMount() {
    const { library, libraryActions, match } = this.props;
    const { id } = match.params;

    if (library.doc == null || id !== library.doc._id) {
      libraryActions.findOne(id);
    }
  }

  editAlbumCallback = albumData => {
    const { libraryActions, alertActions, history } = this.props;
    libraryActions.clear();
    history.push(`/library/album/${albumData.id}`);
    alertActions.show(
      'success',
      'Success',
      "'" + albumData.name + "' has been updated",
    );
  };

  render() {
    const { library } = this.props;
    return (
      <div className="album-edit-page">
        <Card>
          <CardBody>
            <h1 className="mb-0">Edit Album</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            {library.loading && <Loading />}
            {!library.loading && (
              <FormAlbumEdit submitCallback={this.editAlbumCallback} />
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ library }) {
  return { library };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumEditPage);
