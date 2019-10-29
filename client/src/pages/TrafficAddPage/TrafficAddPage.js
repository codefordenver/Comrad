import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormTraffic from '../../components/forms/FormTraffic';
import Card, { CardBody } from '../../components/Card';

class TrafficAddPage extends Component {
  addTrafficCallback = trafficData => {
    const { alertActions, history } = this.props;
    history.push(`/traffic/`);
    alertActions.show(
      'success',
      'Success',
      "'" + trafficData.name + "' has been added",
    );
  };

  render() {
    return (
      <div className="traffic-add-page">
        <Card>
          <CardBody>
            <h1>Add Traffic</h1>
            <>
              <FormTraffic submitCallback={this.addTrafficCallback} />
            </>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(TrafficAddPage);
