import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import CircleDropdown from '../CircleDropdown';
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
    const { data } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            <td>
              <CircleDropdown />
            </td>
            <td>{item.name}</td>
            <td>{item.type}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  render() {
    const { props, renderHeader, renderBody } = this;
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
  return {
    data: state.search.data,
    loading: state.search.loading,
  };
}

export default connect(
  mapStateToProps,
  null,
)(LibraryTable);
