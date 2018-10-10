import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class LibraryTable extends Component {
  state = {}

  renderBody() {
    return (
      <tbody>
        {this.props.results.map(result => (
          <tr key={result._id}>
            <td>{result.title}</td>
            <td>{result.artist}</td>
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
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
              </tr>
            </thead>
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
)(LibraryTable)
