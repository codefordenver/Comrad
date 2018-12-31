import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import CircleDropdown from '../CircleDropdown';
import Loading from '../Loading';
import Table from '../Table';

class AlbumsTable extends Component {
  renderHeader = () => {
    return (
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Label</th>
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
            const { _id, label, name } = item;

            return (
              <tr key={_id}>
                <td>
                  <CircleDropdown />
                </td>
                <td>{name}</td>
                <td>{label}</td>
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
)(AlbumsTable);
