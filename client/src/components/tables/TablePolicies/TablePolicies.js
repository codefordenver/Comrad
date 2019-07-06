import React, { Component } from 'react';
import ReactTable from 'react-table';

const columns = [
  {
    Header: 'Name',
    value: 'name',
  },
  {
    Header: 'Link',
    value: 'link',
  },
];

class TablePolicies extends Component {
  render() {
    return <ReactTable className="-highlight" columns={columns} />;
  }
}

export default TablePolicies;
