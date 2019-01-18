import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';

import LibrarySearchPage from '../../pages/LibrarySearchPage';

class Library extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/search`} component={LibrarySearchPage} />
      </MainLayout>
    );
  }
}

export default Library;
