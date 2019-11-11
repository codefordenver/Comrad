import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormTraffic from '../../components/forms/FormTraffic';
import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';

import { getDifferencesForEventInstance } from '../../utils/events';

import { alertActions, trafficActions } from '../../redux';

class TrafficEditPage extends Component {
  componentDidMount() {
    const { match, trafficActions } = this.props;
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

        trafficActions.updateInstance(
          instanceId,
          changedValues,
          successCallback,
        );
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
      trafficActions.updateSeries(trafficData, successCallback);
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

  render() {
    const { masterTimeOrSeriesId } = this.props.match.params;
    let editingInstance = false;
    if (
      masterTimeOrSeriesId != null &&
      masterTimeOrSeriesId.indexOf('-') !== -1
    ) {
      editingInstance = true;
    }
    return (
      <div className="traffic-add-page">
        <Card>
          <CardBody>
            <h1>Edit Traffic</h1>
            {this.isDocumentLoaded() && (
              <FormTraffic
                editingInstance={editingInstance}
                initialValues={this.props.traffic.doc}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrafficEditPage);
