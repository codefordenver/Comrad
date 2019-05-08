import React from 'react';
import ReactModal from 'react-modal';

const Modal = props => {
  const { isOpen, children, styleName, ...rest } = props;

  ReactModal.setAppElement('body');

  return (
    <>
      <ReactModal
        className={`modal-main`}
        overlayClassName={`modal-overlay`}
        isOpen
        {...rest}
      >
        {children}
      </ReactModal>
    </>
  );
};

export default Modal;
