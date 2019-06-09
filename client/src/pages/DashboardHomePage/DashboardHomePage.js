import React, { Component } from 'react';
import moment from 'moment';

import Card, { CardBody } from '../../components/Card';
import ShowListForUser from '../../components/ShowListForUser';

export default class DashboardHomePage extends Component {
  render() {
    const today = moment();
    const todayPlus3Months = moment().add('3', 'month');
    const oneYearAgo = moment().subtract('1', 'year');
    return (
      <Card>
        <CardBody>
          <div className="dashboard">
            <div className="dashboard__upcoming-shows">
              <h2>My Upcoming Shows</h2>
              <ShowListForUser
                maxItems="3"
                startDate={today}
                endDate={todayPlus3Months}
                noItemsText="You have no upcoming shows in the next three months."
              />
            </div>
            <div className="dashboard__past-shows">
              <h2>My Past Shows</h2>
              <ShowListForUser
                maxItems="10"
                sortNewestToOldest={true}
                startDate={oneYearAgo}
                endDate={today}
                noItemsText="You haven't hosted any shows in the past year."
              />
            </div>
            <div className="dashboard__currently-on-air">
              <h2>Currently On Air</h2>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}
