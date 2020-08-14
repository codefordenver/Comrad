import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormHostGroupEdit from '../../components/forms/FormHostGroupEdit';
import { hostGroupActions, alertActions } from '../../redux';

import Loading from '../../components/Loading';

class HostGroupEditPage extends Component {
  componentDidMount() {
    const { match, hostGroupActions, hostGroup } = this.props;
    const { id } = match.params;

    if (hostGroup.doc === null || hostGroup.doc._id !== id) {
      hostGroupActions.findById(id);
    }
  }

  editHostGroupCallback = hostGroupData => {
    const { hostGroupActions, alertActions, history } = this.props;
    hostGroupActions.clear();
    history.push(`/host-group`);
    alertActions.show(
      'success',
      'Success',
      "'" + hostGroupData.on_air_name + "' has been updated",
    );
  };

  render() {
    const { match, hostGroup } = this.props;
    const { id } = match.params;
    return (
      <div className="host-group-edit-page">
        <Card>
          <CardBody>
            <h1 className="mb-0">Edit Host Group</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            {(hostGroup.doc === null || hostGroup.doc._id !== id) && (
              <Loading />
            )}
            {hostGroup.doc != null && hostGroup.doc._id === id && (
              <FormHostGroupEdit submitCallback={this.editHostGroupCallback} />
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ hostGroup }) {
  return { hostGroup };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    hostGroupActions: bindActionCreators({ ...hostGroupActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HostGroupEditPage);
