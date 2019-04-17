import React, { Component } from 'react';

import Form from './Form';
import Modal from '../../Modal';

class ShowModal extends Component {
  render() {
    const { data, modalVisibility } = this.props;

    return (
      <Modal isOpen={modalVisibility}>
        <Form data={data} />
      </Modal>
    );
  }
}

export default ShowModal;
