import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout'

import LibraryHomePage from '../../pages/LibraryHomePage'

class Library extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <MainLayout>
        <Route exact path={`${url}/`} component={LibraryHomePage} />
      </MainLayout>
    )
  }
}

export default Library
