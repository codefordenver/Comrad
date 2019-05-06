import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { userSearch } from '../../redux/user';

const CellUserPermission = ({ value }) => (
  <span className="table-users__permission">{value}</span>
);

const CellUserStatus = ({ value }) => {
  const status = value === 'Active';

  return (
    <span className={`table-users__status ${status ? 'active' : 'inactive'}`}>
      {value}
    </span>
  );
};

const columns = [
  {
    Header: 'First Name',
    accessor: 'profile.first_name', // String-based value accessors!
  },
  {
    Header: 'Last Name',
    accessor: 'profile.last_name',
  },
  {
    Header: 'Email',
    accessor: 'contact.email',
  },
  {
    Header: 'On Air Name',
    accessor: 'station.on_air_name',
  },
  {
    Header: 'Permissions',
    accessor: 'station.permission',
    Cell: row => <CellUserPermission {...row} />,
  },
  {
    Header: 'Status',
    accessor: 'station.status',
    Cell: row => <CellUserStatus {...row} />,
  },
];

class TableUsers extends Component {
  handleRowClick = (state, rowInfo) => {
    if (rowInfo) {
      return {
        onClick: () => {
          const { _id } = rowInfo.original;
          const { history } = this.props;

          history.push(`/user/profile/${_id}`);
        },
      };
    }

    return false;
  };

  render() {
    const { handleRowClick, props } = this;
    const { user } = props;
    const { docs } = user;

    return (
      <ReactTable
        className="-highlight clickable-rows"
        columns={columns}
        data={docs}
        defaultPageSize={15}
        getTdProps={handleRowClick}
        noDataText="No Data Found"
        showPageSizeOptions={false}
      />
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  { userSearch },
)(TableUsers);
