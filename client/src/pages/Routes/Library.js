import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import LibrarySearch from '../Library/LibrarySearch';
import LibraryAddTracks from '../Library/LibraryAddTracks';
import LibraryAddAlbums from '../Library/LibraryAddAlbums';

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
