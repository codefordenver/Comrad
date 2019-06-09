import React, { Component } from 'react';
import moment from 'moment';

import Card, { CardBody } from '../../components/Card';
import ShowListForUser from '../../components/ShowListForUser';

export default class DashboardHomePage extends Component {
  render() {
    const today = moment();
    const todayPlus3Months = moment().add('3', 'month');
    return (
      <Card>
        <CardBody>
          <div className="dashboard__home">
            <div className="dashboard__shows">
              <h1>My Shows</h1>
              <ShowListForUser
                maxItems="3"
                startDate={today}
                endDate={todayPlus3Months}
                noItemsText="You have no upcoming shows in the next three months."
              />
              <h1>Past Shows</h1>
            </div>
            <div className="dashboard__currently-on-air">
              <h1>Currently On Air</h1>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}
