import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

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

    // START - this logic is also duplicated on the TrafficEditPage
    if (
      trafficData.repeat_rule != null &&
      trafficData.repeat_rule.repeat_start_date != null
    ) {
      // the repeat rule's start date needs to have the same time as the event's date/time
      let repeatStartDate = moment(trafficData.repeat_rule.repeat_start_date);
      let startTimeUtc = moment(trafficData.start_time_utc);
      repeatStartDate.set('hour', startTimeUtc.get('hour'));
      repeatStartDate.set('minute', startTimeUtc.get('minute'));
      repeatStartDate.set('second', startTimeUtc.get('second'));
      trafficData.repeat_rule.repeat_start_date = repeatStartDate.toDate();
    }

    if (
      trafficData.repeat_rule != null &&
      trafficData.repeat_rule.repeat_end_date != null
    ) {
      //the repeat rule end date is only a date selector, we will adjust this value so the time passed to the back-end is at the end of day rather than the beginning of the day
      let repeatEndDate = moment(trafficData.repeat_rule.repeat_end_date);
      repeatEndDate.endOf('day');
      trafficData.repeat_rule.repeat_end_date = repeatEndDate.toDate();
    }
    //END - this logic is also duplicated on the TrafficEditPage

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

export default connect(mapStateToProps, mapDispatchToProps)(TrafficAddPage);
