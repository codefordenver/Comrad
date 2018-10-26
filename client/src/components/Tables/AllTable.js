import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Card, CardBody } from '../Card'

class AllTable extends Component {
  state = {}

  renderHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
    )
  }

  renderBody() {
    return (
      <tbody>
        {this.props.all.map(result => (
          <tr key={result._id}>
            <td>{result.name}</td>
            <td>{result.type}</td>
          </tr>
        ))}
      </tbody>
    )
  }
  render() {
    return (
      <Fragment>
        {this.props.all.length > 0 ? (
          <Card>
            <CardBody>
              <table className="table">
                {this.renderHeader()}
                {this.renderBody()}
              </table>
            </CardBody>
          </Card>
        ) : null}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    all: state.search.all
  }
}

export default connect(
  mapStateToProps,
  null
)(AllTable)
