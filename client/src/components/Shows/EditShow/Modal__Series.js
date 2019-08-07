import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Form from './Form';
import Modal from '../../Modal';

import { getShowSelected, updateSeries } from '../../../redux/show';
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
    const { updateSeries } = props;
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
        this.assign(finalObject, difference.path, difference.rhs);
      });
    }

    updateSeries(_id, finalObject, handleFormSubmit);
  };

  render() {
    const { submit, props } = this;
    const { modalVisibility, data } = props;

    return (
      <Modal isOpen={modalVisibility}>
        <Form onSubmit={submit} data={data} />
      </Modal>
    );
  }
}

export default connect(
  null,
  { setModalVisibility, updateSeries },
)(EditModal);
