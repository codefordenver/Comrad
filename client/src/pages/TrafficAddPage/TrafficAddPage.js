import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormTraffic from '../../components/forms/FormTraffic';
import Card, { CardBody } from '../../components/Card';

import { alertActions, trafficActions } from '../../redux';

class TrafficAddPage extends Component {
  addTrafficCallback = trafficData => {
    const { alertActions, trafficActions, history } = this.props;

    trafficActions.add(trafficData, function() {
      history.push(`/traffic/`);
      alertActions.show(
        'success',
        'Success',
        "'" + trafficData.traffic_details.title + "' has been added",
      );
    });
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

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(TrafficAddPage);
