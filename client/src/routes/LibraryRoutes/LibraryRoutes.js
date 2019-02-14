import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';

import ArtistViewPage from '../../pages/ArtistViewPage';
import LibrarySearchPage from '../../pages/LibrarySearchPage';

class Library extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}`} component={LibrarySearchPage} />
        <Route path={`${url}/artist/:id`} component={ArtistViewPage} />
      </MainLayout>
    );
  }
}

export default Library;
