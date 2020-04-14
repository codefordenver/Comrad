import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import Alert from '../Alert';

import { alertTypes } from '../../redux';

class Modal extends Component {
  componentWillUnmount() {
    const { alertState, alertInactive } = this.props;
    if (alertState.displayAt === 'modal') {
      alertInactive();
    }
  }

  render() {
    const { alertState, isOpen, children, styleName, ...rest } = this.props;

    ReactModal.setAppElement('body');

    return (
      <>
        <ReactModal
          className={`modal-main`}
          overlayClassName={`modal-overlay`}
          isOpen
          {...rest}
        >
          {alertState.active && alertState.displayAt === 'modal' && (
            <Alert {...this.props} />
          )}
          {children}
        </ReactModal>
      </>
    );
  }
}

function mapStateToProps({ alert }) {
  return { alertState: alert };
}

function mapDispatchToProps(dispatch) {
  return {
    alertInactive: () => dispatch({ type: alertTypes.INACTIVE }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
