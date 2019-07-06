import React, { Component } from 'react';

import TablePolicies from '../../components/tables/TablePolicies';

class ResourcePoliciesPage extends Component {
  render() {
    return (
      <div className="rpolp">
        <h3>Policies</h3>
        <TablePolicies />
      </div>
    );
  }
}

export default ResourcePoliciesPage;
