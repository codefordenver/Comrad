import React from 'react';
import { connect } from 'react-redux';
import { setModalVisibility } from '../../redux/modal';

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
  {
    setModalVisibility,
  },
)(ModalClose);
