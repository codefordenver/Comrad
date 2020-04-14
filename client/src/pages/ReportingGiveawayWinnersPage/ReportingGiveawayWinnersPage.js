import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import FormDateRangeForExport from '../../components/forms/FormDateRangeForExport';
import Loading from '../../components/Loading';

import { trafficActions } from '../../redux';

class ReportingGiveawayWinnersPage extends Component {
  state = {
    loading: true,
  };

  handleSubmit = values => {
    window.location.href =
      process.env.REACT_APP_API_SERVER_URL +
      'reporting/giveaways?from=' +
      encodeURIComponent(moment(values.from).toISOString()) +
      '&to=' +
      encodeURIComponent(
        moment(values.to)
          .add(1, 'day')
          .toISOString(),
      );
  };

  componentDidMount = () => {
    const { trafficActions, traffic } = this.props;
    if (
      traffic.earliest != null &&
      traffic.earliest.traffic_details.type === 'Giveaway'
    ) {
      this.setState({ loading: false });
    } else {
      //get the earliest available giveaway event
      let self = this;
      trafficActions.findEarliest('Giveaway', function() {
        self.setState({ loading: false });
      });
    }
  };

  render() {
    const { loading } = this.state;
    const { traffic } = this.props;

    return (
      <div>
        <h2>Giveaway Winners </h2>
        {loading && <Loading displayMode="static" />}
        {!loading && (
          <>
            <h4>Filter by Scheduled Date/Time for Giveaway</h4>
            <FormDateRangeForExport
              submitCallback={this.handleSubmit}
              initialValues={{
                from:
                  traffic.earliest != null
                    ? moment(traffic.earliest.start_time_utc)
                    : null,
                to: moment(),
              }}
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
)(ReportingGiveawayWinnersPage);
