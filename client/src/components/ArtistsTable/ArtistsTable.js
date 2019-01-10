import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import Table from '../Table';

class ArtistsTable extends Component {
  renderHeader = () => {
    return (
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>ID</th>
        </tr>
      </thead>
    );
  };

  renderBody = () => {
    const { data } = this.props;

    return (
      <tbody>
        {data.map(item => {
          if (item.type === 'album') {
            return (
              <tr key={item._id}>
                <td />
                <td>{item.name}</td>
                <td>{item._id}</td>
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    );
  };

  render() {
    const { props, renderBody, renderHeader } = this;
    const { loading, data } = props;

    return (
      <Fragment>
        {loading && <Loading />}
        {data.length > 0 ? (
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
  const { data, loading } = state.search;

  return {
    data,
    loading,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ArtistsTable);
