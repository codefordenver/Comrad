import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import Table from '../Table';

class LibraryTable extends Component {
  renderHeader = () => {
    return (
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
    );
  };

  renderBody = () => {
    const { docs } = this.props.search;

    return (
      <tbody>
        {docs.map(item => (
          <tr key={item._id}>
            <td />
            <td>{item.name}</td>
            <td>{item.type}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  render() {
    const { props, renderHeader, renderBody } = this;
    const { loading, docs } = props.search;

    return (
      <Fragment>
        {loading && <Loading />}
        {docs.length > 0 ? (
          <Table>
            {renderHeader()}
            {renderBody()}
          </Table>
        ) : null}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(
  mapStateToProps,
  null,
)(LibraryTable);
