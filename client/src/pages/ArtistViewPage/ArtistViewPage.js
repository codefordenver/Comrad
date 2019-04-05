import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card, { CardBody } from '../../components/Card';
import FormArtistUpdateName from '../../components/FormArtistUpdateName';
import TableAlbums from '../../components/TableAlbums';

import { artistFindAlbums } from '../../redux/artist';

class ArtistViewPage extends Component {
  componentDidMount() {
    const { artist, artistFindAlbums, match } = this.props;
    const { _id } = artist.doc;
    const { id } = match.params;

    if (id !== _id) {
      artistFindAlbums(id);
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
    const { props } = this;

    return (
      <div className="artist-view-page">
        <Card>
          <CardBody>
            <FormArtistUpdateName {...props} />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2>Albums</h2>
            <div className="artist-view-page__album-table-container">
              {!props.loadingAlbums && (
                <TableAlbums
                  albums={props.artist.albums}
                  loading={props.artist.loading}
                  onRowClick={this.navigateToAlbum}
                />
              )}
            </div>
          </CardBody>
        </Card>
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
  { artistFindAlbums },
)(ArtistViewPage);
