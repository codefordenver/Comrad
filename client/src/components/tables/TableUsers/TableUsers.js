import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

const CellUserRole = ({ value }) => {
  if (value) {
    return <span className="table-users__role">{value.join(', ')}</span>;
  }

  return <span className="table-users__role">No Role</span>;
};

const CellUserStatus = ({ value }) => {
  return <span className={`table-users__status ${value}`}>{value}</span>;
};

const columns = [
  {
    Header: 'First Name',
    accessor: 'first_name', // String-based value accessors!
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'On Air Name',
    accessor: 'on_air_name',
  },
  {
    Header: 'Role',
    accessor: 'roles',
    Cell: row => <CellUserRole {...row} />,
  },
  {
    Header: 'Status',
    accessor: 'status',
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
    const { userState } = props;
    const { docs } = userState;

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
    userState: user,
  };
}

export default connect(
  mapStateToProps,
  null,
)(TableUsers);
