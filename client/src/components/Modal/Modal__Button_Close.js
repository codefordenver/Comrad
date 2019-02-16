import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Button from '../Button';

const ModalClose = props => {
  const handleModalCancel = e => {
    e.preventDefault();
    props.setModalVisibility(null, false, null);
  };

  return (
    <Button color="danger" onClick={handleModalCancel}>
      Cancel
    </Button>
  );
};

export default connect(
  null,
  actions,
)(ModalClose);
