import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import Modal from '../../Modal';

import { updateShow } from '../../../redux/show';
import { setModalVisibility } from '../../../redux/modal';

import { getDifferencesForEventInstance } from '../../../utils/events';

class EditModal extends Component {
  handleFormSubmit = () => {
    const { setModalVisibility } = this.props;
    setModalVisibility(null, false, null);
  };

  assign = (obj, keyPath, value) => {
    const mongoosePath = keyPath.join('.');
    obj[mongoosePath] = value;
  };

  submit = values => {
    const { handleFormSubmit, props } = this;
    const { updateShow } = props;
    const {
      initial,
      initial: { _id },
    } = values;

    let updated = values;
    delete updated.initial;

    let changedObject = getDifferencesForEventInstance(initial, updated);

    updateShow(_id, changedObject, handleFormSubmit);
  };

  render() {
    const { submit, props } = this;
    const {
      modalVisibility,
      data,
      editSummaryAndDescriptionOnly = false,
    } = props;

    return (
      <Modal isOpen={modalVisibility}>
        <Form
          onSubmit={submit}
          data={data}
          editSummaryAndDescriptionOnly={editSummaryAndDescriptionOnly}
        />
      </Modal>
    );
  }
}

export default connect(
  null,
  { setModalVisibility, updateShow },
)(EditModal);
