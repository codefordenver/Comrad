import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import Modal from '../../Modal';

import { postShow } from '../../../redux/show';
import { setModalVisibility } from '../../../redux/modal';

class ShowModal extends Component {
  handleFormSubmit = () => {
    const { setModalVisibility } = this.props;
    setModalVisibility(null, false, null);
  };

  submit = values => {
    const { postShow } = this.props;
    postShow(values, this.handleFormSubmit);
  };

  render() {
    const { submit, props } = this;
    const { modalVisibility, data } = props;

    return (
      <Modal show={modalVisibility}>
        <Form onSubmit={submit} data={data} />
      </Modal>
    );
  }
}

export default connect(
  null,
  { setModalVisibility, postShow },
)(ShowModal);
