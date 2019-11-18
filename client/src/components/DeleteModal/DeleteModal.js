import React, { Component } from 'react';
import Modal from '../Modal';
import Button from '../Button';

class DeleteModal extends Component {
  deleteEntity = (type, id) => {
    const { libraryActions } = this.props;
    libraryActions.remove(id, this.deleteSuccess, this.deleteFailure);
  };

  deleteFailure = () => {
    window.scrollTo(0, 0);
    this.closeDeleteModal();
  };

  deleteSuccess = entity => {
    window.scrollTo(0, 0);
    this.closeDeleteModal();
    this.props.alertActions.hide();
    this.setState(
      {
        deleteSuccessModal: entity.data,
      },
      function() {
        //refresh data from the database - https://github.com/tannerlinsley/react-table/issues/808#issuecomment-373673915
        this.table.fireFetchData();
      },
    );
  };
  render() {
    const { deleteModal, closeDeleteModal, deleteEntity } = this.props;
    return (
      <Modal isOpen={true}>
        <div className="library-search__delete-modal">
          Are you sure you want to delete the {deleteModal.type}{' '}
          <i>{deleteModal.name}</i>?
          <div>
            <Button color="neutral" onClick={closeDeleteModal}>
              No
            </Button>
            <Button
              type="submit"
              onClick={() =>
                deleteEntity(deleteModal.type, deleteModal._original._id)
              }
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default DeleteModal;
