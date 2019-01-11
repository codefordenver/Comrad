import React from 'react';

const Modal = props => {
  const { handleClose, show, children, styleName, ...rest } = props;

  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={`modal ${styleName || ''} ${showHideClassName}`} {...rest}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default Modal;
