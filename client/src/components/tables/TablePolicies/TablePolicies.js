import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { bindActionCreators } from 'redux';

import { resourceActions } from '../../../redux/resource';

const columns = [
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Link',
    accessor: 'link',
  },
];

class TablePolicies extends Component {
  componentDidMount() {
    const { resourceActions } = this.props;
    resourceActions.findAll();
  }

  render() {
    const { resourceState } = this.props;

    return (
      <ReactTable
        className="-highlight"
        columns={columns}
        data={resourceState.docs}
        minRows={3}
        showPagination={false}
      />
    );
  }
}

function mapStateToProps({ resource }) {
  return {
    resourceState: resource,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resourceActions: bindActionCreators({ ...resourceActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TablePolicies);
