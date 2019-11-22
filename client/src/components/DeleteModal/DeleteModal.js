import React, { Component } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { libraryActions } from '../../redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class DeleteModal extends Component {
  deleteEntity = (type, id) => {
    const { libraryActions } = this.props;
    libraryActions.remove(
      id,
      this.props.deleteSuccess,
      this.props.deleteFailure,
    );
  };

  render() {
    const { deleteModal, closeDeleteModal } = this.props;
    return (
      <Modal isOpen={true}>
        <div className="library-search__delete-modal">
          {/* Data type is sometimes stored as deleteModal.type and sometimes as deleteModal._original.type*/}
          Are you sure you want to delete the{' '}
          {deleteModal.type || deleteModal._original.type}{' '}
          <i>{deleteModal.name}</i>?
          <div>
            <Button color="neutral" onClick={closeDeleteModal}>
              No
            </Button>
            <Button
              type="submit"
              onClick={() =>
                this.deleteEntity(deleteModal.type, deleteModal._original._id)
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

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(DeleteModal);
