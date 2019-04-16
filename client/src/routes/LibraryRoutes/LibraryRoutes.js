import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';

import AlbumViewPage from '../../pages/AlbumViewPage';
import ArtistViewPage from '../../pages/ArtistViewPage';
import LibrarySearchPage from '../../pages/LibrarySearchPage';
import TrackViewPage from '../../pages/TrackViewPage';

class Library extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}`} component={LibrarySearchPage} />
        <Route path={`${url}/album/:id`} component={AlbumViewPage} />
        <Route path={`${url}/artist/:id`} component={ArtistViewPage} />
        <Route path={`${url}/track/:id`} component={TrackViewPage} />
      </MainLayout>
    );
  }
}

export default Library;
