import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class ArtistsTable extends Component {
  state = {}

  renderHeader() {
    <thead>
      <tr>
        <th>Name</th>
        <th>ID</th>
      </tr>
    </thead>
  }

  renderBody() {
    return (
      <tbody>
        {this.props.results.map(result => {
          if (result.type === 'artist') {
            return (
              <tr key={result._id}>
                <td>{result.name}</td>
                <td>{result._id}</td>
              </tr>
            )
          }
          return null;
        })}
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
)(ArtistsTable);
