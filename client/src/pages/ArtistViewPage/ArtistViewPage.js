import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import { Link } from 'react-router-dom';

import ButtonIcon from '../../components/ButtonIcon';
import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import FormArtistUpdateName from '../../components/forms/FormArtistUpdateName';
import LargeText from '../../components/LargeText';
import TableArtistAlbums from '../../components/tables/TableArtistAlbums';

import { artistActions } from '../../redux';

class ArtistViewPage extends Component {
  componentDidMount() {
    const { artist, artistActions, match } = this.props;
    const { _id } = artist.doc;
    const { id } = match.params;

    if (id !== _id) {
      artistActions.findOne(id);
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
    const { match, artist } = props;
    const { doc, loading } = artist;
    const { albums, updated_at } = doc;
    const dateObj = new Date(updated_at);
    const lastUpdated = `${dateObj.toLocaleDateString()}`;
    const { url } = this.props.match;

    return (
      <div className="artist-view">
        {loading && <Loading />}
        {!loading ? (
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
                {isEmpty(albums) ? (
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
    artistActions: bindActionCreators({ ...artistActions }, dispatch),
  };
}

function mapStateToProps({ artist }) {
  return {
    artist,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistViewPage);
