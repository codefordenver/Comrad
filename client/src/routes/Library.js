import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import LibrarySearch from '../pages/Library/LibrarySearch';
import LibraryAddTracks from '../pages/Library/LibraryAddTracks';
import LibraryAddAlbums from '../pages/Library/LibraryAddAlbums';

class Library extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <main className="library">
        <section className="library__body">
          <Route exact path={`${url}/`} component={LibrarySearch} />
          <Route path={`${url}/add/track`} component={LibraryAddTracks} />
          <Route path={`${url}/add/album`} component={LibraryAddAlbums} />
        </section>
      </main>
    )
  }
}

export default Library
