import React, { component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { getModalType, getModalVisibility } from '../../reducers/modals';

import NewShowModal from './NewShowModal';
import UpdateShowModal from './UpdateShowModal';
import ViewShowModal from './ViewShowModal';

export const MODAL_NEW_SHOW = 'modal_new_show';
export const MODAL_UPDATE_SHOW = 'modal_update_show';
export const MODAL_VIEW_SHOW = 'modal_view_show';

const ModalController = props => {
  switch (props.modalType) {
    case MODAL_NEW_SHOW:
      return <NewShowModal {...props} />;

    case MODAL_UPDATE_SHOW:
      return <UpdateShowModal {...props} />;

    case MODAL_VIEW_SHOW:
      return <ViewShowModal {...props} />;

    default:
      return null;
  }
};
function mapStateToProps({ modals }) {
  return {
    modalType: getModalType(modals),
    modalVisibility: getModalVisibility(modals),
  };
}

export default connect(
  mapStateToProps,
  actions,
)(ModalController);
