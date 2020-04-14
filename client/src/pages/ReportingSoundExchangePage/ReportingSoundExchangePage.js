import React, { Component } from 'react';
import moment from 'moment';

import FormDateRangeForExport from '../../components/forms/FormDateRangeForExport';

class ReportingSoundExchangePage extends Component {
  handleSubmit = values => {
    let url =
      process.env.REACT_APP_API_SERVER_URL + 'reporting/sound-exchange?';

    if (values.from != null) {
      url += 'from=' + encodeURIComponent(moment(values.from).toISOString());
    }

    if (values.to != null) {
      url +=
        '&to=' +
        encodeURIComponent(
          moment(values.to)
            .add(1, 'day')
            .toISOString(),
        );
    }
    window.location.href = url;
  };

  render() {
    return (
      <div>
        <h2>Sound Exchange Report </h2>
        <h4>Filter by Dates of Track Plays</h4>
        <div className="mb-1">
          If you leave the "From" field blank, the report will go back to the
          oldest track plays. If you leave the "To" field blank, the report will
          go up to the current track plays.
        </div>

        <FormDateRangeForExport
          key="form-sound-exchange-report"
          submitCallback={this.handleSubmit}
          requireFromDate={false}
          requireToDate={false}
        />
      </div>
    );
  }
}

export default ReportingSoundExchangePage;
