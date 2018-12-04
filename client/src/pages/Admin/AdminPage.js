import React, { Component } from 'react';
import PrimaryAndSecondary from '../../components/Button/PrimaryAndSecondary';


class AdminPage extends Component {
  state = {};

  render() {
    return (
      <div className="admin__page">
        Admin Page
        <p>
          <PrimaryAndSecondary buttonType={"primary"}>Default</PrimaryAndSecondary>
        </p>

        <p>
        <PrimaryAndSecondary buttonType={"primaryDisabled"}>Disabled</PrimaryAndSecondary>
        </p>



        <p>
        <PrimaryAndSecondary buttonType={"secondary"}>Default</PrimaryAndSecondary>
        </p>

        <p>
        <PrimaryAndSecondary buttonType={"secondaryDisabled"}>Disabled</PrimaryAndSecondary>
        </p>      


      </div>

    )
  }
}

export default AdminPage;