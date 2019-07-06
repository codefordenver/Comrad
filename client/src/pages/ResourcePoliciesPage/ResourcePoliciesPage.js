import React, { Component } from 'react';

import Button from '../../components/Button';
import FormResourceAdd from '../../components/forms/FormResourceAdd';
import TablePolicies from '../../components/tables/TablePolicies';

class ResourcePoliciesPage extends Component {
  state = {
    content: 'table',
  };

  handleSwitch = content => {
    this.setState({
      content,
    });
  };

  renderHeader = () => {
    const { handleSwitch, state } = this;

    switch (state.content) {
      case 'table':
        return (
          <>
            <h3>Policies</h3>
            <Button onClick={() => handleSwitch('form')}>Add</Button>
          </>
        );

      case 'form':
        return <h3>Add Policy</h3>;

      default:
        break;
    }
  };

  renderContent = () => {
    const { handleSwitch, state } = this;

    switch (state.content) {
      case 'table':
        return <TablePolicies />;

      case 'form':
        return (
          <FormResourceAdd
            category="policies"
            handleSwitch={handleSwitch}
            {...this.props}
          />
        );

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
