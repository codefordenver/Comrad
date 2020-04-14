import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';

class ResourceLayout extends Component {
  render() {
    const { children, configState } = this.props;

    let resourceNavigation = [];

    if (configState.resourcesCategories != null) {
      configState.resourcesCategories.forEach((rc, idx) => {
        let path =
          `/resources/` + rc.replace(/[^A-Za-z0-9]/gi, '-').toLowerCase();
        if (idx === 0) {
          path = `/resources`;
        }
        resourceNavigation.push(
          <NavLink key={rc.replace(' ', '-')} to={path}>
            <Button className="block mb-1 text-center w-100">{rc}</Button>
          </NavLink>,
        );
      });
    }

    return (
      <div className="resource-layout">
        <section className="resource-layout__header">
          <Card>
            <CardBody>
              <h1 className="mb-0">Resources</h1>
            </CardBody>
          </Card>
        </section>

        <section className="resource-layout__navigation">
          <Card>
            <CardBody>
              {configState.resourcesCategories != null && (
                <>{resourceNavigation}</>
              )}
            </CardBody>
          </Card>
        </section>

        <section className="resource-layout__content">
          <Card>
            <CardBody>{children}</CardBody>
          </Card>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    configState: state.config,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ResourceLayout);
