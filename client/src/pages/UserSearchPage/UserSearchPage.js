import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userFindAll } from '../../actions';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';
import FormUserSearch from '../../components/FormUserSearch';
import TableUsers from '../../components/TableUsers';

class UserSearchPage extends Component {
  componentDidMount() {
    const { userFindAll } = this.props;
    userFindAll();
  }

  render() {
    const { props } = this;
    const { user } = props;
    const { alert, docs, loading } = user;
    const { display } = alert;

    return (
      <div className="user-search">
        <Card>
          <CardBody>
            <h1 className="mb-0">Users</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="user-search__header">
              <div className="user-search__form">
                <FormUserSearch {...props} />
              </div>
              <div className="user-search__options">
                <div>Button Goes here</div>
              </div>
            </div>
            <TableUsers docs={docs} loading={loading} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = state.user;
  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  { userFindAll },
)(UserSearchPage);
