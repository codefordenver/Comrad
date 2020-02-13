/* WORK IN PROGRESS - uses new Form component rather than Redux Form */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';

import { config } from './config';

import Button from '../../components/Button';
import { CardV2, Form, Heading, InputV2, SelectV2 } from '../../components';

import { userActions } from '../../redux/user';

class UserAddEditPage extends Component {
  componentDidMount() {
    const { match, userActions, userState } = this.props;
    const { _id } = userState.doc;
    const { id } = match.params;

    if (typeof id === 'undefined') {
      userActions.userClear();
    } else if (id !== _id) {
      userActions.findOne(id);
    }
  }

  handleSubmit = values => {
    const { handleGoBack, props } = this;
    const { userActions } = props;

    userActions.add(values, () => {
      handleGoBack();
    });
  };

  handleGoBack = () => {
    const { history, location } = this.props;

    if (location.state != null && location.state.prevPath != null) {
      history.push(location.state.prevPath);
    } else {
      history.push('/user/search');
    }
  };

  render() {
    const { handleGoBack, handleSubmit } = this;
    const { validation } = config;

    return (
      <div className="user-form">
        <Row className="mb-1">
          <Col>
            <CardV2>
              <CardV2.Body>
                <Heading className="mb-0" size={1}>
                  Add / Edit User
                </Heading>
              </CardV2.Body>
            </CardV2>
          </Col>
        </Row>

        <Row>
          <Col>
            <CardV2>
              <CardV2.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Row>
                      <Col md={4}>
                        <InputV2
                          className="input"
                          label="First Name"
                          name="first_name"
                          type="text"
                          validate={
                            validation.status && validation.params.first_name
                          }
                        />
                      </Col>

                      <Col md={4}>
                        <InputV2
                          className="input"
                          label="Last Name"
                          name="last_name"
                          type="text"
                          validate={
                            validation.status && validation.params.last_name
                          }
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group>
                    <Row className="mb-1">
                      <Col md={4}>
                        <InputV2
                          className="input"
                          label="Phone Number"
                          name="primary_phone"
                          type="text"
                        />
                      </Col>

                      <Col md={4}>
                        <InputV2
                          className="input"
                          label="Email Address"
                          name="email"
                          type="text"
                          validate={
                            validation.status && validation.params.email
                          }
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group>
                    <Row className="mb-1">
                      <Col md={4}>
                        {/* TODO: this will need to support entering/editing multiple roles */}
                        <SelectV2 label="Role" name="role" selected="blank">
                          <SelectV2.Option value="Admin">Admin</SelectV2.Option>

                          <SelectV2.Option value="Full Access">
                            Full Access
                          </SelectV2.Option>

                          <SelectV2.Option value="Show Captain">
                            Show Captain
                          </SelectV2.Option>

                          <SelectV2.Option value="DJ">DJ</SelectV2.Option>

                          <SelectV2.Option value="Underwriting">
                            Underwriting
                          </SelectV2.Option>

                          <SelectV2.Option value="Music Library Admin">
                            Music Library Admin
                          </SelectV2.Option>
                        </SelectV2>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group>
                    <Row>
                      <Col>
                        <Button className="mr-1" type="submit">
                          Add New User
                        </Button>

                        <Button color="danger" onClick={handleGoBack}>
                          Go Back
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </CardV2.Body>
            </CardV2>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ auth, user }, ownProps) {
  let initialValues = {};
  if (ownProps.match.params.id === user.doc._id) {
    initialValues = user.doc;
  }
  return {
    authState: auth,
    userState: user,
    initialValues,
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
)(UserAddEditPage);
