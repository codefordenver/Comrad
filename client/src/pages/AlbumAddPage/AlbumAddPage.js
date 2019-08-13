import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import FormAlbumAdd from '../../components/forms/FormAlbumAdd';

import { alertActions, libraryActions } from '../../redux';

class AlbumAddPage extends Component {
  componentDidMount() {
    const { library, libraryActions, match } = this.props;
    const { id } = match.params;

    if (library.doc == null || id !== library.doc._id) {
      libraryActions.findOne(id);
    }
  }

  addAlbumCallback = albumData => {
    const { alertActions, history } = this.props;
    history.push(`/library/artist/${albumData.artist}`);
    alertActions.show(
      'success',
      'Success',
      "'" + albumData.name + "' has been added",
    );
  };

  render() {
    const { library } = this.props;
    return (
      <div className="album-add-page">
        <Card>
          <CardBody>
            <h1>Add New Album</h1>
            {library.loading && <Loading />}
            {!library.loading && library.doc != null && (
              <FormAlbumAdd
                submitCallback={this.addAlbumCallback}
                history={this.props.history}
                artistId={library.doc._id}
              />
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
)(AlbumAddPage);
