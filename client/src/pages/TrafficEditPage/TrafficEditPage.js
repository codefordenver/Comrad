import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import FormTraffic from '../../components/forms/FormTraffic';
import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';

import {
  getDifferencesForEventInstance,
  repeatRuleToDropdownValue,
} from '../../utils/events';

import { alertActions, trafficActions } from '../../redux';

class TrafficEditPage extends Component {
  componentDidMount() {
    const { match, trafficActions, history } = this.props;
    const { masterTimeOrSeriesId } = match.params;

    //always find a series in the database since the redux state might be a state of an instance from the VIew Traffic page
    //we can use the redux state from the instance page though
    if (masterTimeOrSeriesId.indexOf('-') !== -1 && !this.isDocumentLoaded()) {
      trafficActions.findById(masterTimeOrSeriesId);
    } else {
      trafficActions.findById(masterTimeOrSeriesId);
    }
  }

  editTrafficCallback = trafficData => {
    const {
      alertActions,
      trafficActions,
      history,
      match,
      traffic,
    } = this.props;
    const { masterTimeOrSeriesId } = match.params;
    let successCallback = function() {
      history.push(`/traffic/`);
      alertActions.show(
        'success',
        'Success',
        "'" + trafficData.traffic_details.title + "' has been edited",
      );
    };

    if (masterTimeOrSeriesId.indexOf('-') !== -1) {
      let updateData = function(instanceId, instanceData) {
        // only submit the data in traffic_details that has changed from the initial values
        let changedValues = getDifferencesForEventInstance(
          traffic.doc,
          instanceData,
        );

        trafficActions.update(instanceId, changedValues, successCallback);
      };
      //if the traffic event we found is not an instance, and we're editing an instance,
      //it means the instance doesn't exist in the database. create that instance
      let seriesId = masterTimeOrSeriesId.substring(
        0,
        masterTimeOrSeriesId.indexOf('-'),
      );

      if (traffic.doc._id === seriesId) {
        trafficActions.createInstance(seriesId, trafficData, function(
          instance,
        ) {
          updateData(instance._id, trafficData);
        });
      } else {
        //editing existing instance
        updateData(trafficData._id, trafficData);
      }
    } else {
      // START - this logic is also duplicated on the TrafficAddPage
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
      //END - this logic is also duplicated on the TrafficAddPage

      trafficActions.update(trafficData._id, trafficData, successCallback);
    }
  };

  isDocumentLoaded = () => {
    const { match, traffic } = this.props;
    const { doc, loading } = traffic;
    const { masterTimeOrSeriesId } = match.params;
    if (loading) {
      return false;
    }
    if (doc != null) {
      if (
        masterTimeOrSeriesId === doc.master_time_id ||
        doc._id === masterTimeOrSeriesId ||
        doc._id ===
          masterTimeOrSeriesId.substring(0, masterTimeOrSeriesId.indexOf('-'))
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  trafficInitialValues = () => {
    return {
      ...this.props.traffic.doc,
      repeat_rule_dropdown_value: repeatRuleToDropdownValue(
        this.props.traffic.doc.repeat_rule,
      ),
    };
  };

  render() {
    const { traffic, history } = this.props;
    return (
      <div className="traffic-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Traffic</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            {this.isDocumentLoaded() && (
              <FormTraffic
                initialValues={this.trafficInitialValues()}
                cancelCallback={() => history.push('/traffic/' + traffic.doc._id)}
                submitCallback={this.editTrafficCallback}
              />
            )}
            {!this.isDocumentLoaded() && <Loading />}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ traffic }) {
  return {
    traffic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrafficEditPage);
