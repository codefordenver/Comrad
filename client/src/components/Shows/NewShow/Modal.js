import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import Modal from '../../Modal';

import { setModalVisibility } from '../../../redux/modal';

class ShowModal extends Component {
  handleFormSubmit = () => {
    this.props.setModalVisibility(null, false, null);
  };

  submit = values => {
    this.props.postShow(values, this.handleFormSubmit);
    console.log(values);
  };

  render() {
    return (
      <Modal show={this.props.modalVisibility}>
        <Form onSubmit={this.submit} data={this.props.data} />
      </Modal>
    );
  }
}

export default connect(
  null,
  { setModalVisibility },
)(ShowModal);
