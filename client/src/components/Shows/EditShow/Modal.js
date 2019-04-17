import React, { Component } from 'react';

import Form from './Form';
import Modal from '../../Modal';

class ShowModal extends Component {
  submit = values => {
    console.log(values);
  };

  render() {
    const { submit, props } = this;
    const { data, modalVisibility } = props;

    return (
      <Modal isOpen={modalVisibility}>
        <Form onSubmit={submit} data={data} />
      </Modal>
    );
  }
}

export default ShowModal;
