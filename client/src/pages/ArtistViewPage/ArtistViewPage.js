import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';
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
    const { match, artist, artistActions } = props;
    const { alert, doc, loading } = artist;
    const { albums, updated_at } = doc;
    const dateObj = new Date(updated_at);
    const lastUpdated = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;

    return (
      <div className="artist-view">
        <Alert alertClose={artistActions.alertClose} {...alert} />
        {!loading ? (
          <>
            <Card>
              <CardBody>
                <div className="float-right">Last updated: {lastUpdated}</div>
                <FormArtistUpdateName match={match} />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h2 className="mb-1">Albums</h2>
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
