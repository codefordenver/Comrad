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
import AlbumAddFromItunesPage from "../../pages/AlbumAddFromItunesPage"
import AlbumAddPage from '../../pages/AlbumAddPage';
import AlbumEditPage from '../../pages/AlbumEditPage';

class Library extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}`} component={LibrarySearchPage} />
        <Switch>
          <Route path={`${url}/album/:id/add`} component={TrackAddPage} />
          <Route path={`${url}/album/:id/edit`} component={AlbumEditPage} />
          <Route path={`${url}/album/add-from-itunes`} component={AlbumAddFromItunesPage} />
          <Route path={`${url}/album/add`} component={AlbumAddPage} />
          <Route path={`${url}/album/:id`} component={AlbumViewPage} />
        </Switch>
        <Switch>
          <Route path={`${url}/artist/add`} component={ArtistAddPage} />
          <Route path={`${url}/artist/:id/add`} component={AlbumAddPage} />
          <Route path={`${url}/artist/:id`} component={ArtistViewPage} />
        </Switch>
        <Switch>
          <Route path={`${url}/track/:id/edit`} component={TrackEditPage} />
          <Route path={`${url}/track/:id`} component={TrackViewPage} />
        </Switch>
      </MainLayout>
    );
  }
}

export default Library;
