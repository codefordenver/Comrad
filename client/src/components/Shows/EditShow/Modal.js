import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Form from './Form';
import Modal from '../../Modal';

import { getShowSelected, postShow } from '../../../redux/show';
import { setModalVisibility } from '../../../redux/modal';

import { diff } from 'deep-diff';

class ShowModal extends Component {
  handleFormSubmit = () => {
    const { setModalVisibility } = this.props;
    setModalVisibility(null, false, null);
  };

  //https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by
  assign = (obj, keyPath, value) => {
    let lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
      let key = keyPath[i];
      if (!(key in obj)) {
        obj[key] = {};
      }
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  };

  submit = values => {
    const { handleFormSubmit, props } = this;
    const { postShow } = props;
    const { initial } = values;
    console.log(initial);
    let finalObject = {};
    let updated = values;
    delete updated.initial;
    let changes = diff(initial, updated);

    if (changes) {
      changes.forEach(difference => {
        this.assign(finalObject, difference.path, difference.rhs);
      });
    }

    console.log(finalObject);
    //console.log(valuesObject);
    // const submitOnlyChanges = values.filter(
    //   (value, key) => !(value === initial[key]),
    // );
    // console.log(submitOnlyChanges);
    //postShow(values, handleFormSubmit);
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
  { setModalVisibility, postShow },
)(ShowModal);
