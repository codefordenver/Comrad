import React from 'react';

import Form from './Form';
import Modal from '../../Modal';

const ShowModal = props => {
  return (
    <Modal show={props.modalVisibility}>
      <Form />
    </Modal>
  );
};

export default ShowModal;
