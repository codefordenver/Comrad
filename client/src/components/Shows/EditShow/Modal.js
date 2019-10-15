import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import Modal from '../../Modal';

import { updateShow } from '../../../redux/show';
import { setModalVisibility } from '../../../redux/modal';

import { diff } from 'deep-diff';

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

    let finalObject = {};
    let updated = values;
    delete updated.initial;
    let changes = diff(initial, updated);

    if (changes) {
      changes.forEach(difference => {
        if (difference.kind === 'A') {
          //array
          // we will save the whole array, we don't need to determine the individual paths that were changed because the instance will contain the full array (there won't be a part of it stored on the series)
          let array = values;
          difference.path.forEach(idx => {
            array = array[idx];
          });
          finalObject[difference.path.join('.')] = array;
        } else {
          this.assign(finalObject, difference.path, difference.rhs);
        }
      });
    }

    updateShow(_id, finalObject, handleFormSubmit);
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
