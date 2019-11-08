import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { trafficActions } from '../../redux';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';

class TrafficViewPage extends Component {
  componentDidMount() {
    const { match, trafficActions } = this.props;
    const { masterTimeId } = match.params;

    if (!this.isDocumentLoaded()) {
      trafficActions.findById(masterTimeId);
    }
  }

  componentWillUnmount() {
    const { trafficActions } = this.props;
    trafficActions.clear();
  }

  isDocumentLoaded = () => {
    const { match, traffic } = this.props;
    const { doc, loading } = traffic;
    const { masterTimeId } = match.params;
    if (loading) {
      return false;
    }
    if (doc != null) {
      if (
        masterTimeId === doc.master_time_id ||
        doc._id === masterTimeId ||
        doc._id === masterTimeId.substring(0, masterTimeId.indexOf('-'))
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
    const { traffic } = this.props;
    const { doc } = traffic;

    let formattedTime = '';
    if (this.isDocumentLoaded()) {
      formattedTime = moment(doc.start_time_utc).format('ddd, MMM D h:ma');
    }

    return (
      <div className="traffic-view-page">
        {!this.isDocumentLoaded() && <Loading />}
        {this.isDocumentLoaded() && (
          <>
            <Card>
              <CardBody>
                <h1>{doc.traffic_details.title}</h1>
                {doc.master_event_id != null &&
                  doc.master_event_id._id !== doc._id && (
                    <span>
                      This instance has been modified from the other traffic
                      events in the series.
                    </span>
                  )}
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div>{formattedTime}</div>
                <div>Type: {doc.traffic_details.type}</div>
                <div>
                  Description:
                  <div
                    dangerouslySetInnerHTML={{
                      __html: doc.traffic_details.description,
                    }}
                  />
                </div>
                {doc.traffic_details.type === 'Feature' && (
                  <div>Producer: {doc.traffic_details.producer}</div>
                )}
                {doc.traffic_details.type === 'Underwriting' && (
                  <div>
                    Underwriter Name: {doc.traffic_details.underwriter_name}
                  </div>
                )}

                {doc.traffic_details.type === 'Giveaway' && (
                  <>
                    <div>
                      Event Name:{' '}
                      {doc.traffic_details.giveaway_details.event_name}
                    </div>
                    <div>
                      Event Date:{' '}
                      {doc.traffic_details.giveaway_details.event_date}
                    </div>
                    <div>
                      Venue: {doc.traffic_details.giveaway_details.venue}
                    </div>
                    <div>
                      Winner:
                      {doc.traffic_details.giveaway_details.no_winner && (
                        <>No Winner</>
                      )}
                      {!doc.traffic_details.giveaway_details.no_winner &&
                        (typeof doc.traffic_details.giveaway_details.winner ===
                          'undefined' ||
                          doc.traffic_details.giveaway_details.winner ===
                            null) && (
                          <>Giveaway result has not been entered yet</>
                        )}
                      {doc.traffic_details.giveaway_details.winner != null && (
                        <ul>
                          <li>
                            {doc.traffic_details_giveaway_details.winner.name}
                          </li>
                          <li>
                            {doc.traffic_details_giveaway_details.winner.phone}
                          </li>
                          <li>
                            {doc.traffic_details_giveaway_details.winner.email}
                          </li>
                          <li>
                            {
                              doc.traffic_details_giveaway_details.winner
                                .address
                            }
                          </li>
                        </ul>
                      )}
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
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
)(TrafficViewPage);
