import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class TracksTable extends Component {
  state = {}

  renderHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Track Number</th>
          <th>Duration</th>
        </tr>
      </thead>
    )
  }

  renderBody() {
    return (
      <tbody>
        {this.props.results.map(result => {
          if(result.type === 'track') {
            return (
              <tr key={result._id}>
                <td>{result.name}</td>
                <td>{result.track_number}</td>
                <td>{result.duration}</td>
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
)(TracksTable);