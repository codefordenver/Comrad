import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';

class ResourceLayout extends Component {
  render() {
    const { children } = this.props;

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
              <NavLink to="/resource">
                <Button className="block mb-1 text-center w-100">
                  Policies
                </Button>
              </NavLink>

              <NavLink to="/resource/station-rules">
                <Button className="block mb-1 text-center w-100">
                  Station Rules
                </Button>
              </NavLink>

              <NavLink to="/resource/permissions">
                <Button className="block mb-1 text-center w-100">
                  Permissions
                </Button>
              </NavLink>
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

export default ResourceLayout;
