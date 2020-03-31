import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';

class ReportingLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="reporting-layout">
        <section className="reporting-layout__header">
          <Card>
            <CardBody>
              <h1 className="mb-0">Reporting</h1>
            </CardBody>
          </Card>
        </section>

        <section className="reporting-layout__navigation">
          <Card>
            <CardBody>
              <NavLink to="/reporting/">
                <Button className="block mb-1 text-center w-100">
                  Sound Exchange
                </Button>
              </NavLink>
              <NavLink to="/reporting/charting">
                <Button className="block mb-1 text-center w-100">
                  Charting
                </Button>
              </NavLink>
              <NavLink to="/reporting/giveaway-winners">
                <Button className="block mb-1 text-center w-100">
                  Giveaway Winners
                </Button>
              </NavLink>
              <NavLink to="/reporting/underwriting">
                <Button className="block mb-1 text-center w-100">
                  Underwriting
                </Button>
              </NavLink>
            </CardBody>
          </Card>
        </section>

        <section className="reporting-layout__content">
          <Card>
            <CardBody>{children}</CardBody>
          </Card>
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(ReportingLayout);
