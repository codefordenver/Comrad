import React, { Component } from 'react';

import Button from '../../components/Button';
import TablePolicies from '../../components/tables/TablePolicies';

class ResourcePoliciesPage extends Component {
  state = {
    content: 'table',
  };

  handleSwitch = () => {
    this.setState({
      content: 'form',
    });
  };

  renderHeader = () => {
    const { handleSwitch, state } = this;

    switch (state.content) {
      case 'table':
        return (
          <>
            <h3>Policies</h3>
            <Button onClick={handleSwitch}>Add</Button>
          </>
        );
      case 'form':
        return <h3>Add Policy</h3>;
      default:
        break;
    }
  };

  renderContent = () => {
    const { state } = this;

    switch (state.content) {
      case 'table':
        return <TablePolicies />;
      case 'form':
        return <div>Form</div>;
      default:
        break;
    }
  };

  render() {
    const { renderContent, renderHeader } = this;

    return (
      <div className="rpolp">
        <div className="rpolp__header">{renderHeader()}</div>
        <div className="rpolp__content">{renderContent()}</div>
      </div>
    );
  }
}

export default ResourcePoliciesPage;
