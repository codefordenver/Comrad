import React from 'react';

import Form from './Form';
import Modal from '../../Modal';

const ShowModal = props => {
  function submit(values) {
    console.log(values);
  }

  return (
    <Modal isOpen={props.modalVisibility}>
      <Form onSubmit={submit} data={props.data} />
    </Modal>
  );
};

export default ShowModal;
