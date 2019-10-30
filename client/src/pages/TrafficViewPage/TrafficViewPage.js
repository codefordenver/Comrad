import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
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
      if (masterTimeId === doc.master_time_id || doc._id === masterTimeId) {
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

    return (
      <div className="traffic-view-page">
        {!this.isDocumentLoaded() && <Loading />}
        {this.isDocumentLoaded() && (
          <>
            <Card>
              <CardBody>
                <h1>{doc.traffic_details.title}</h1>
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
