import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormTraffic from '../../components/forms/FormTraffic';
import Card, { CardBody } from '../../components/Card';

import { alertActions, trafficActions } from '../../redux';

class TrafficAddPage extends Component {
  addTrafficCallback = trafficData => {
    const {
      addDeleteActionReturnLocation,
      alertActions,
      trafficActions,
      history,
    } = this.props;

    trafficActions.add(trafficData, function() {
      history.push(
        addDeleteActionReturnLocation
          ? addDeleteActionReturnLocation
          : `/traffic/`,
      );
      alertActions.show(
        'success',
        'Success',
        "'" + trafficData.traffic_details.title + "' has been added",
      );
    });
  };

  render() {
    const { match } = this.props;
    const { timeToAddAt } = match.params;
    return (
      <div className="traffic-add-page">
        <Card>
          <CardBody>
            <h1>Add Traffic</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <FormTraffic
              submitCallback={this.addTrafficCallback}
              timeToAddAt={timeToAddAt}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ traffic }) {
  return {
    addDeleteActionReturnLocation: traffic.addDeleteActionReturnLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrafficAddPage);
