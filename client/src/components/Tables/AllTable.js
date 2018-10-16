import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

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
        {this.props.results.map(result => (
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
        {this.props.results.length !== 0 ? (
          <table className="table">
            {this.renderHeader()}
            {this.renderBody()}
          </table>
        ) : (
          null
        )}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results
  }
}

export default connect(
  mapStateToProps,
  null
)(AllTable);