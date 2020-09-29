import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import Modal from 'react-modal';

import classnames from 'classnames';
import { isEmpty } from 'lodash';
import moment from 'moment';

import { userActions } from '../../redux';

import Button from '../../components/Button';
import ShowListForUser from '../../components/ShowListForUser';
import { CardV2, Heading, ProfileImg } from '../../components';

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
      _id,
      api_key,
      can_delete,
      email,
      first_name,
      last_name,
      on_air_name,
      host_groups,
    } = userState.doc;

    const today = moment();
    const todayPlus3Months = moment().add('3', 'month');
    const oneYearAgo = moment().subtract('1', 'year');

    return (
      <div className="user-profile-page">
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

                    <Heading size={5}>Address</Heading>
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
                {authState.doc &&
                authState.doc.roles.indexOf('Admin') !== -1 ? (
                  <CardV2>
                    <CardV2.Body>
                      <Heading size={3}>Access and API</Heading>
                      <div>
                        <Heading className="mb-1" size={5}>
                          Status
                        </Heading>
                        <p
                          className={classnames(
                            'user-profile-page__status',
                            `user-profile-page__status--${
                              userState.doc.status === 'Active'
                                ? 'true'
                                : 'false'
                            }`,
                          )}
                        >
                          {userState.doc.status}
                        </p>
                      </div>
                      {/* ======= CAN DELETE ======= */}
                      <div>
                        {can_delete ? (
                          <Button
                            className="w-75"
                            color="danger"
                            onClick={openModal}
                            disabled={!can_delete}
                          >
                            Delete User
                          </Button>
                        ) : (
                          <p>
                            This user cannot be deleted because they are a host
                            of a show.
                          </p>
                        )}
                      </div>
                      {/* ======= END CAN DELETE ======= */}
                      {/* ======= API KEY ======= */}
                      <div>
                        <Heading
                          className="user-profile-page__api-key-header"
                          align="center"
                          size={5}
                        >
                          API Key
                        </Heading>
                      </div>
                      <div className="api-button">
                        <Button
                          className="w-75 mb-1"
                          color="primary"
                          onClick={handleApiCreateReset}
                        >
                          {api_key.token ? 'Reset API Key' : 'Create API Key'}
                        </Button>
                      </div>
                      <div className="mt-1 api-button">
                        {api_key.token ? (
                          <Button
                            className="w-75"
                            color="danger"
                            onClick={handleApiDelete}
                          >
                            Delete API Key
                          </Button>
                        ) : null}
                      </div>
                      {/* ======= END API KEY ======= */}
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
                        <Button
                          className="w-100"
                          color="primary"
                          to={'/user/profile/edit/' + _id}
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  </CardV2.Body>
                </CardV2>
              </Col>
              <Col>
                <CardV2 className="user-profile-page__past-future-shows">
                  <h3 className="Heading Heading--3 user-profile-page__shows-headings">
                    Upcoming Shows
                  </h3>
                  <ShowListForUser
                    maxItems="3"
                    startDate={today}
                    endDate={todayPlus3Months}
                    noItemsText="This user has no upcoming shows in the next three months."
                    userId={_id}
                    hostGroups={host_groups}
                  />
                  <h3 className="Heading Heading--3 user-profile-page__shows-headings mt-2">
                    Past Shows
                  </h3>
                  <ShowListForUser
                    maxItems="10"
                    doNotIncludeNowPlaying={true}
                    sortNewestToOldest={true}
                    startDate={oneYearAgo}
                    endDate={today}
                    noItemsText="This user hasn't hosted any shows in the past year."
                    userId={_id}
                    hostGroups={host_groups}
                  />
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
              <div className="confirm-user-delete-modal">
                <div className="mb-1">
                  Are You Sure you want to delete{' '}
                  <i>{(first_name + ' ' + last_name).trim()}</i>?
                </div>
                <div>
                  <Button color="primary" onClick={handleUserDelete}>
                    Yes
                  </Button>

                  <Button className="ml-1" color="neutral" onClick={closeModal}>
                    No
                  </Button>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
