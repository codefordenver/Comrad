import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import Modal from 'react-modal';
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

  handleOnClick = () => {
    const { history, match, userActions } = this.props;

    userActions.remove(match.params.id, () => {
      history.push('/user/search');
    });
  };

  render() {
    const { closeModal, handleOnClick, openModal, props } = this;
    const { userState } = props;

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
                      <Col>
                        <Button
                          className="w-100"
                          color="danger"
                          onClick={openModal}
                        >
                          Delete
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
                    onClick={handleOnClick}
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
