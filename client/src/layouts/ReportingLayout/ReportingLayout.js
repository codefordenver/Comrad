import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';

class ReportingLayout extends Component {
  render() {
    const { auth, children } = this.props;

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
              {auth.doc.roles != null &&
                (auth.doc.roles.indexOf('Admin') !== -1 ||
                  auth.doc.roles.indexOf('Full Access') !== -1) && (
                  <>
                    <NavLink to="/reporting/sound-exchange">
                      <Button className="block mb-1 text-center w-100">
                        Sound Exchange
                      </Button>
                    </NavLink>
                    <NavLink to="/reporting/charting">
                      <Button className="block mb-1 text-center w-100">
                        Charting
                      </Button>
                    </NavLink>
                  </>
                )}
              {auth.doc.roles != null &&
                (auth.doc.roles.indexOf('Admin') !== -1 ||
                  auth.doc.roles.indexOf('Full Access') !== -1 ||
                  auth.doc.roles.indexOf('Underwriting') !== -1) && (
                  <>
                    <NavLink to="/reporting/underwriting">
                      <Button className="block mb-1 text-center w-100">
                        Underwriting
                      </Button>
                    </NavLink>
                  </>
                )}
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

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ReportingLayout);
