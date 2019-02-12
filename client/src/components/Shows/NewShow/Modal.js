import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import Modal from '../../Modal';

import * as actions from '../../../actions';

class ShowModal extends Component {
  handleFormSubmit = () => {
    this.props.setModalVisibility(null, false, null);
  };

  submit = values => {
    this.props.postShow(values, this.handleFormSubmit);
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
  actions,
)(ShowModal);
