import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainLayout from '../../layouts/MainLayout';
import ResourceLayout from '../../layouts/ResourceLayout';

import ResourcesPage from '../../pages/ResourcesPage';

import { configActions } from '../../redux';

class ResourcesRoute extends Component {
  componentWillMount() {
    const { configState, configActions } = this.props;

    if (configState.resourcesCategories === null) {
      configActions.getResourcesCategories();
    }
  }

  render() {
    const { configState } = this.props;
    const { url } = this.props.match;

    if (configState.resourcesCategories != null) {
      const routes = [];
      configState.resourcesCategories.forEach(function(rc, idx) {
        let path = `${url}/` + rc.replace(/[^A-Za-z0-9]/gi, '-').toLowerCase();
        if (routes.length === 0) {
          path = `${url}`;
        }
        routes.push(
          <Route
            key={'resource-route-' + idx}
            exact
            path={path}
            render={props => <ResourcesPage {...props} resourceCategory={rc} />}
          />,
        );
      });
      return (
        <MainLayout {...this.props}>
          <ResourceLayout {...this.props}>{routes}</ResourceLayout>
        </MainLayout>
      );
    } else {
      return <></>;
    }
  }
}

function mapStateToProps(state) {
  return {
    configState: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    configActions: bindActionCreators({ ...configActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourcesRoute);
