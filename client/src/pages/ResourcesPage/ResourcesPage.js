import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import FormResourceAdd from '../../components/forms/FormResourceAdd';
import FormResourceEdit from '../../components/forms/FormResourceEdit';
import TableResources from '../../components/tables/TableResources';

class ResourcesPage extends Component {
  state = {
    content: 'table',
  };

  handleSwitch = content => {
    this.setState({
      content,
    });
  };

  handleRowEditClick = val => {
    this.setState({
      content: 'edit',
      resource: val,
    });
  };

  renderHeader = () => {
    const { handleSwitch, state } = this;
    const { resource } = this.state;
    const { resourceCategory, auth } = this.props;

    switch (state.content) {
      case 'table':
        return (
          <>
            <h3>{resourceCategory}</h3>
            {auth.doc.roles != null &&
              (auth.doc.roles.indexOf('Admin') !== -1 ||
                auth.doc.roles.indexOf('Full Access') !== -1) && (
                <Button onClick={() => handleSwitch('form')}>Add</Button>
              )}
          </>
        );

      case 'form':
        return <h3>Add to {resourceCategory}</h3>;

      case 'edit':
        return <h3>{resource.description}</h3>;

      default:
        break;
    }
  };

  renderContent = () => {
    const { handleSwitch, state } = this;
    const { resourceCategory } = this.props;

    switch (state.content) {
      case 'table':
        return (
          <TableResources
            handleRowEditClick={this.handleRowEditClick}
            category={resourceCategory}
          />
        );

      case 'form':
        return (
          <FormResourceAdd
            category={resourceCategory}
            handleSwitch={handleSwitch}
            {...this.props}
          />
        );

      case 'edit':
        return (
          <FormResourceEdit
            data={this.state.resource}
            handleSwitch={handleSwitch}
          />
        );

      default:
        break;
    }
  };

  render() {
    const { renderContent, renderHeader } = this;

    return (
      <div className="resources-page">
        <div className="resources-page__header">{renderHeader()}</div>
        <div className="resources-page__content">{renderContent()}</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ResourcesPage);
