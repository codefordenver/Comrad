import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import BuilderPage from '../Builder/BuilderPage';

class Builder extends Component {
  state = {}

  render() {
    const { url } = this.props.match;

    return (
      <main className="builder">
        <section className="builder__body">
          <Route exact page={`${url}/`} component={BuilderPage} />
        </section>
      </main>
    )
  }
}

export default Builder
