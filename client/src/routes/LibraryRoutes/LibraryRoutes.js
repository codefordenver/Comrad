import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';

import AlbumViewPage from '../../pages/AlbumViewPage';
import ArtistAddPage from '../../pages/ArtistAddPage';
import ArtistViewPage from '../../pages/ArtistViewPage';
import LibrarySearchPage from '../../pages/LibrarySearchPage';
import TrackViewPage from '../../pages/TrackViewPage';
import TrackAddPage from '../../pages/TrackAddPage';
import TrackEditPage from '../../pages/TrackEditPage';

class Library extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}`} component={LibrarySearchPage} />
        <Switch>
          <Route path={`${url}/album/:id/add`} component={TrackAddPage} />
          <Route path={`${url}/album/:id`} component={AlbumViewPage} />
        </Switch>
        <Switch>
          <Route path={`${url}/artist/add`} component={ArtistAddPage} />
          <Route path={`${url}/artist/:id`} component={ArtistViewPage} />
        </Switch>
        <Route path={`${url}/track/:id/edit`} component={TrackEditPage} />
        <Route path={`${url}/track/:id`} component={TrackViewPage} />
      </MainLayout>
    );
  }
}

export default Library;
