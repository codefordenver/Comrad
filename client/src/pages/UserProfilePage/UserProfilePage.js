import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import Modal from 'react-modal';

import classnames from 'classnames';
import { isEmpty } from 'lodash';

import { userActions } from '../../redux';

import Button from '../../components/Button';
import { CardV2, Form, Heading, ProfileImg } from '../../components';

const customStyles = {
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
  },
};

Modal.setAppElement('body');

class UserProfilePage extends Component {
  state = {
    modalIsOpen: false,
  };

  componentDidMount() {
    const { match, userActions, userState } = this.props;
    const { _id } = userState.doc;
    const { id } = match.params;

    if (id !== _id) {
      userActions.findOne(id);
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleApiCreateReset = () => {
    const { userActions, userState } = this.props;
    const id = userState.doc._id;

    userActions.createApiKey({ id });
  };

  handleApiDelete = () => {
    const { userActions, userState } = this.props;
    const { _id } = userState.doc;

    userActions.deleteApiKey({ _id });
  };

  handleCanDeleteUser = () => {
    const { history, userActions, userState } = this.props;
    const { _id } = userState.doc;

    userActions.remove({ _id }, () => {
      history.push('/user/search');
    });
  };

  handleUserDelete = () => {
    const { history, userState, userActions } = this.props;
    const { _id } = userState.doc;

    userActions.remove({ _id }, () => {
      history.push('/user/search');
    });
  };

  render() {
    const {
      closeModal,
      handleApiCreateReset,
      handleApiDelete,
      handleUserDelete,
      openModal,
      props,
    } = this;
    const { authState, userState } = props;

    const {
      api_key,
      can_delete,
      email,
      first_name,
      last_name,
      on_air_name,
    } = userState.doc;

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

                <CardV2 className="mb-1">
                  <CardV2.Body>
                    <Heading size={3}>Station</Heading>

                    <Heading size={5}>On Air Name</Heading>
                    <p>{on_air_name}</p>
                  </CardV2.Body>
                </CardV2>

                {/* ======= ADMIN ======= */}
                {authState.doc && authState.doc.role === 'Admin' ? (
                  <CardV2>
                    <CardV2.Body>
                      <Heading size={3}>Admin</Heading>

                      <Row>
                        {/* ======= API KEY ======= */}
                        <Col>
                          <Heading className="mb-1" size={5}>
                            Status
                            <span
                              className={classnames(
                                'user-profile-page__api-key-status',
                                `user-profile-page__api-key-status--${
                                  api_key.token ? 'true' : 'false'
                                }`,
                              )}
                            >
                              {api_key.token ? 'TRUE' : 'FALSE'}
                            </span>
                          </Heading>

                          <Row>
                            <Col>
                              <Button
                                className="w-100 mb-1"
                                color="primary"
                                onClick={handleApiCreateReset}
                              >
                                {api_key.token ? 'Reset' : 'Create'}
                              </Button>
                              {api_key.token ? (
                                <Button
                                  className="w-100"
                                  color="danger"
                                  onClick={handleApiDelete}
                                >
                                  Delete
                                </Button>
                              ) : null}
                            </Col>
                          </Row>
                        </Col>
                        {/* ======= END API KEY ======= */}

                        {/* ======= CAN DELETE ======= */}
                        <Col>
                          <Heading className="mb-1" size={5}>
                            Can Delete
                            <span
                              className={classnames(
                                'user-profile-page__api-key-status',
                                `user-profile-page__api-key-status--${
                                  can_delete ? 'true' : 'false'
                                }`,
                              )}
                            >
                              {can_delete ? 'TRUE' : 'FALSE'}
                            </span>
                          </Heading>

                          <Row>
                            <Col>
                              <Button
                                className="w-100"
                                color="danger"
                                onClick={openModal}
                                disabled={!can_delete}
                              >
                                Delete User
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        {/* ======= END CAN DELETE ======= */}
                      </Row>
                    </CardV2.Body>
                  </CardV2>
                ) : null}
                {/* ======= END ADMIN======= */}
              </Col>

              <Col>
                <CardV2>
                  <CardV2.Body>
                    <ProfileImg />
                    <Row>
                      <Col>
                        <Button className="w-100" color="primary">
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  </CardV2.Body>
                </CardV2>
              </Col>
              <Col>
                <CardV2>
                  <CardV2.Body>3 Section</CardV2.Body>
                </CardV2>
              </Col>
            </Row>

            {/* ======= MODAL ======= */}
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <Row>
                <Col>
                  <Heading align="center" className="mb-1" size={2}>
                    Are You Sure?
                  </Heading>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    className="w-100"
                    color="primary"
                    onClick={handleUserDelete}
                  >
                    Yes
                  </Button>
                </Col>
                <Col>
                  <Button className="w-100" color="danger" onClick={closeModal}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Modal>
            {/* ======= END MODAL ======= */}
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps({ auth, user }) {
  return {
    authState: auth,
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
