import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';
import FormArtistUpdateName from '../../components/FormArtistUpdateName';
import LargeText from '../../components/LargeText';
import TableArtistAlbums from '../../components/TableArtistAlbums';

import { artistAlertClose, artistFindOne } from '../../redux/artist';

class ArtistViewPage extends Component {
  componentDidMount() {
    const { artist, artistFindOne, match } = this.props;
    const { _id } = artist.doc;
    const { id } = match.params;

    if (id !== _id) {
      artistFindOne(id);
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
    const { match, artist, artistAlertClose } = props;
    const { alert, doc, loading } = artist;
    const { albums } = doc;

    return (
      <div className="artist-view">
        <Alert alertClose={artistAlertClose} {...alert} />
        {!loading ? (
          <>
            <Card>
              <CardBody>
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

function mapStateToProps({ artist }) {
  return {
    artist,
  };
}

export default connect(
  mapStateToProps,
  { artistAlertClose, artistFindOne },
)(ArtistViewPage);
