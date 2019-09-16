import React from 'react';

export const config = {
  table: {
    search: {
      columns: [
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
          accessor: 'role',
          Cell: ({ value }) => <span className="">{value}</span>,
        },
        {
          Header: 'Status',
          accessor: 'status',
          Cell: ({ value }) => {
            const status = value === 'Active' ? 'active' : 'inactive';

            return <span className={`Table__status ${status}`}>{value}</span>;
          },
        },
      ],
    },
  },
};
