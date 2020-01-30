import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import Modal from '../../Modal';

import {
  clearAllButPastInstancesForShow,
  updateSeries,
} from '../../../redux/show';
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
    const { clearAllButPastInstancesForShow, updateSeries } = props;
    const {
      initial,
      initial: { _id },
    } = values;

    let finalObject = {};
    let updated = JSON.parse(JSON.stringify(values));
    delete updated.initial;
    let changes = diff(initial, updated);

    if (changes) {
      changes.forEach(difference => {
        this.assign(finalObject, difference.path, difference.rhs);
      });
    }

    if ('end_time_utc' in finalObject || 'start_time_utc' in finalObject) {
      if (!('end_time_utc' in finalObject)) {
        finalObject.end_time_utc = values.end_time_utc;
      }
      if (!('start_time_utc' in finalObject)) {
        finalObject.start_time_utc = values.start_time_utc;
      }
      if (
        !window.confirm(
          "You're changing the start/end time of a series, which means the start/end time of all future instances of this show will be modified with the new start/end time. Click OK to confirm.",
        )
      ) {
        return false;
      }
      clearAllButPastInstancesForShow(values.master_time_id);
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
  { clearAllButPastInstancesForShow, setModalVisibility, updateSeries },
)(EditModal);
