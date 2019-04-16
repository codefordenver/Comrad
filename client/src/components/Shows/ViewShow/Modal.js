import React from 'react';

import Form from './Form';
import Modal from '../../Modal';

const ShowModal = props => {
  return (
    <Modal isOpen={props.modalVisibility}>
      <Form data={props.data} />
    </Modal>
  );
};

export default ShowModal;
