import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import ButtonIcon from '../../components/ButtonIcon';
import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import FormArtistUpdateName from '../../components/forms/FormArtistUpdateName';
import LargeText from '../../components/LargeText';
import TableArtistAlbums from '../../components/tables/TableArtistAlbums';

import { libraryActions } from '../../redux';

class ArtistViewPage extends Component {
  componentDidMount() {
    const { library, libraryActions, match } = this.props;
    const { id } = match.params;

    if (library.doc == null || id !== library.doc._id) {
      libraryActions.findOne(id);
    }
  }

  navigateToAlbum = (state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        //navigate to the view page for this album
        this.props.history.push('/library/album/' + rowInfo.original._id);
      },
    };
  };

  render() {
    const { navigateToAlbum, props } = this;
    const { match, library } = props;
    const { doc, loading } = library;
    const { url } = this.props.match;

    let lastUpdated = '';
    if (doc != null) {
      const dateObj = new Date(doc.updated_at);
      lastUpdated = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
    }

    return (
      <div className="artist-view">
        {loading && <Loading />}
        {!loading && doc != null ? (
          <>
            <Card>
              <CardBody className="artist-view__header">
                <FormArtistUpdateName
                  className="artist-view__name"
                  match={match}
                />
                <div className="artist-view__type">Artist</div>
                <div className="artist-view__last-updated">
                  Last updated: {lastUpdated}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="artist-view__header2 mb-1">
                  <h2 className="artist-view__name2">Albums</h2>
                  <div className="artist-view__add-album2">
                    <ButtonIcon icon="plus" to={`${url}/add`} />
                  </div>
                </div>
                {isEmpty(doc.albums) ? (
                  <LargeText align="left">No Albums</LargeText>
                ) : (
                  <TableArtistAlbums onRowClick={navigateToAlbum} />
                )}
              </CardBody>
            </Card>
          </>
        ) : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

function mapStateToProps({ library }) {
  return {
    library,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistViewPage);
