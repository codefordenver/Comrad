import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactTable from 'react-table';

import Card, { CardBody } from '../../components/Card';
import FormArtistUpdateName from '../../components/FormArtistUpdateName';

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

    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Number of Tracks',
        accessor: 'number_of_tracks',
      },
      {
        Header: 'Label',
        accessor: 'label',
      },
      {
        Header: 'Updated At',
        accessor: 'updated_at',
        Cell: row => {
          let dateObj = new Date(row.value);
          return (
            dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString()
          );
        },
      },
    ];

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
            <div className="artist-view-page__album-table">
              {!props.loadingAlbums && (
                <ReactTable
                  className="-highlight clickable-rows"
                  columns={columns}
                  data={props.artist.albums}
                  loading={props.artist.loading}
                  showPageSizeOptions={false}
                  defaultPageSize={100}
                  minRows={3} // so the formatting does not look weird when there are 0 records
                  noDataText="This artist does not have any albums"
                  getTdProps={this.navigateToAlbum}
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
