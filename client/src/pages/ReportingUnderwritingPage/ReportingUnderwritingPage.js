import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import FormDateRangeForExport from '../../components/forms/FormDateRangeForExport';
import Loading from '../../components/Loading';

import { trafficActions } from '../../redux';

class ReportingUnderwritingPage extends Component {
  state = {
    loading: true,
  };

  handleSubmit = values => {
    let url =
      process.env.REACT_APP_API_SERVER_URL +
      'reporting/underwriting?from=' +
      encodeURIComponent(moment(values.from).toISOString()) +
      '&to=' +
      encodeURIComponent(moment(values.to).toISOString());
    if (typeof values.underwriter != null) {
      url += '&underwriter=' + encodeURIComponent(values.underwriter);
    }
    window.location.href = url;
  };

  componentDidMount = () => {
    const { trafficActions, traffic } = this.props;
    if (
      traffic.earliest != null &&
      traffic.earliest.traffic_details.type === 'Underwriting'
    ) {
      this.setState({ loading: false });
    } else {
      //get the earliest available giveaway event
      let self = this;
      trafficActions.findEarliest('Underwriting', function() {
        self.setState({ loading: false });
      });
    }
  };

  render() {
    const { loading } = this.state;
    const { traffic } = this.props;

    return (
      <div>
        <h2>Underwriting Report</h2>
        {loading && <Loading displayMode="static" />}
        {!loading && (
          <>
            <FormDateRangeForExport
              submitCallback={this.handleSubmit}
              initialValues={{
                from:
                  traffic.earliest != null
                    ? moment(traffic.earliest.start_time_utc)
                    : null,
                to: moment(),
              }}
              withUnderwriterName={true}
            />
          </>
        )}
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
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportingUnderwritingPage);
