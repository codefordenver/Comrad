import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hostGroupActions } from '../../redux';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';

class HostGroupViewPage extends Component {
  componentDidMount() {
    const { match, hostGroupActions, hostGroup } = this.props;
    const { id } = match.params;

    if (hostGroup.doc === null || hostGroup.doc._id !== id) {
      hostGroupActions.findById(id);
    }
  }

  handleEdit = () => {
    const { history, hostGroup } = this.props;
    history.push('/host-group/' + hostGroup.doc._id + '/edit');
  };

  render() {
    const { hostGroup, match } = this.props;
    const { doc } = hostGroup;
    const { id } = match.params;

    let hosts = [];
    if (doc != null) {
      doc.users.forEach(u => {
        hosts.push(<div key={'host-' + u._id}>{u.on_air_name}</div>);
      });
    }

    return (
      <div className="host-group-view-page">
        {(doc === null || doc._id !== id) && <Loading />}
        {doc != null && doc._id === id && (
          <>
            <Card>
              <CardBody>
                <h1>{doc.on_air_name}</h1>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div>
                  <b>Hosts in Group:</b>
                  {hosts}
                </div>

                <Button className="mr-1" onClick={this.handleEdit}>
                  Edit
                </Button>
              </CardBody>
            </Card>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps({ hostGroup }) {
  return {
    hostGroup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hostGroupActions: bindActionCreators({ ...hostGroupActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HostGroupViewPage);
