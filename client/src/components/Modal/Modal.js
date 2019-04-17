import React from 'react';
import ReactModal from 'react-modal';

const Modal = props => {
  const { isOpen, children, styleName, ...rest } = props;

  return (
    <>
      <ReactModal
        className={`modal-main z-index--100`}
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
