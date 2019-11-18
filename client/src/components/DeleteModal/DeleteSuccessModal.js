import React, { Component } from 'react';
import Modal from '../Modal';
import Button from '../Button';

export default class DeleteSuccessModal extends Component {
  render() {
    const { deleteSuccessModal, closeDeleteSuccessModal } = this.props;
    return (
      <Modal isOpen={true}>
        <div className="library-search__delete-success-modal">
          <i>{deleteSuccessModal.name}</i> was successfully deleted.
          <div>
            <Button color="neutral" onClick={closeDeleteSuccessModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
