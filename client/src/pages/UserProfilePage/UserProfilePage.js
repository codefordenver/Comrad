import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { isEmpty } from 'lodash';

import { userActions } from '../../redux';

import { CardV2, Heading } from '../../components';

class UserProfilePage extends Component {
  componentDidMount() {
    const { match, userActions, userState } = this.props;
    const { _id } = userState.doc;
    const { id } = match.params;

    if (id !== _id) {
      userActions.findOne(id);
    }
  }

  render() {
    const { userState } = this.props;

    const { email, first_name, last_name, on_air_name } = userState.doc;

    return (
      <div className="u">
        {userState.loading || isEmpty(userState.doc) ? null : (
          <>
            <Row>
              <Col>
                <CardV2 className="mb-1">
                  <CardV2.Body>
                    <Heading size={3}>Contact</Heading>

                    <Heading size={5}>Name</Heading>
                    <p>
                      {first_name} {last_name}
                    </p>

                    <Heading size={5}>Email</Heading>
                    <p>{email}</p>

                    <Heading size={5}>Addres</Heading>
                  </CardV2.Body>
                </CardV2>

                <CardV2>
                  <CardV2.Body>
                    <Heading size={3}>Station</Heading>

                    <Heading size={5}>On Air Name</Heading>
                    <p>{on_air_name}</p>
                  </CardV2.Body>
                </CardV2>
              </Col>
              <Col />
              <Col />
            </Row>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    userState: user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilePage);
