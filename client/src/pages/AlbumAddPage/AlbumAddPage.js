import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import FormAlbumAdd from '../../components/forms/FormAlbumAdd';

import { alertActions, artistActions } from '../../redux';

class AlbumAddPage extends Component {
  componentDidMount() {
    const { artist, artistActions, match } = this.props;
    const { id } = match.params;

    if (artist.doc == null || id !== artist.doc._id) {
      artistActions.findOne(id);
    }
  }

  addAlbumCallback = albumData => {
    const { alertActions, artistActions, history } = this.props;
    artistActions.clear();
    history.push(`/library/artist/${albumData.artist}`);
    alertActions.show(
      'success',
      'Success',
      "'" + albumData.name + "' has been added",
    );
  };

  render() {
    const { artist } = this.props;
    const { _id } = artist.doc;
    return (
      <div className="aap">
        <Card className="mb-1">
          <CardBody>
            <h1 className="mb-0">Add New Album</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="aap__form">
            {artist.loading && <Loading />}
            {!artist.loading && (
              <FormAlbumAdd
                submitCallback={this.addAlbumCallback}
                history={this.props.history}
                artistId={_id}
              />
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ artist }) {
  return { artist };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    artistActions: bindActionCreators({ ...artistActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumAddPage);
