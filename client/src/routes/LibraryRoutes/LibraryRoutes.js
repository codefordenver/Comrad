import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';

import AlbumViewPage from '../../pages/AlbumViewPage';
import ArtistAddPage from '../../pages/ArtistAddPage';
import ArtistViewPage from '../../pages/ArtistViewPage';
import LibrarySearchPage from '../../pages/LibrarySearchPage';
import TrackViewPage from '../../pages/TrackViewPage';
import TrackAddPage from '../../pages/TrackAddPage';

class Library extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}`} component={LibrarySearchPage} />
        <Route path={`${url}/album/:id`} component={AlbumViewPage} />
        <Switch>
          <Route path={`${url}/artist/add`} component={ArtistAddPage} />
          <Route path={`${url}/artist/:id`} component={ArtistViewPage} />
          <Route path={`${url}/album/:id/add`} component={TrackAddPage} />
        </Switch>
        <Route path={`${url}/track/:id`} component={TrackViewPage} />
      </MainLayout>
    );
  }
}

export default Library;
