import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPageUrl: props.nextPageUrl,
    };
  }

  render() {
    const { loading, docs, totalPages } = this.props;

    console.log(docs);

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Type',
        accessor: 'type',
        //remove this class
      },
      {
        Header: 'Popularity',
        accessor: 'popularity',
      },
    ];

    return <div />;
  }
}

export default TableLibrary;
