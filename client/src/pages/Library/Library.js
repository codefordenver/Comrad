import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { DropRightBtn } from '../../components/Button';

import Search from '../../components/Search';
import AllTable from '../../components/Tables/AllTable';
import ArtistsTable from '../../components/Tables/ArtistsTable';
import AlbumsTable from '../../components/Tables/AlbumsTable';
import TracksTable from '../../components/Tables/TracksTable';
import AddTrack from '../../components/Tracks/AddTrack';
import AddAlbum from '../../components/Albums/AddAlbum';


class Library extends Component {
  state = {}

  render() {
    return (
      <main className="library">
        <section className="library__header">
          <div className="library__search">
            <Search />
          </div>
          <div className="library__add">
            <DropRightBtn />
          </div>
        </section>
        <section className="library__tables">
          <Route exact path={`${this.props.match.url}/`} component={AllTable} />
          <Route path={`${this.props.match.url}/artists`} component={ArtistsTable} />
          <Route path={`${this.props.match.url}/albums`} component={AlbumsTable} />
          <Route path={`${this.props.match.url}/tracks`} component={TracksTable} />
          <Route path={`${this.props.match.url}/add/track`} component={AddTrack} />
          <Route path={`${this.props.match.url}/add/album`} component={AddAlbum} />
        </section>
      </main>
    )
  }
}

export default Library
