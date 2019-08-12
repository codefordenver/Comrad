import React from 'react';
import { connect } from 'react-redux';

import {
  getModalType,
  getModalVisibility,
  getModalData,
} from '../../redux/modal';

import NewShowModal from './NewShow/Modal';
import ViewShowModal from './ViewShow/Modal';
import EditShowModal from './EditShow/Modal';
import EditSeriesModal from './EditShow/Modal__Series';

export const MODAL_NEW_SHOW = 'modal_new_show';
export const MODAL_EDIT_SHOW = 'modal_edit_show';
export const MODAL_EDIT_SERIES = 'modal_edit_series';
export const MODAL_VIEW_SHOW = 'modal_view_show';

const ModalController = props => {
  switch (props.modalType) {
    case MODAL_NEW_SHOW:
      return <NewShowModal {...props} />;

    case MODAL_VIEW_SHOW:
      return <ViewShowModal {...props} />;

    case MODAL_EDIT_SHOW:
      return <EditShowModal {...props} />;

    case MODAL_EDIT_SERIES:
      return <EditSeriesModal {...props} />;

    default:
      return null;
  }
};
function mapStateToProps({ modal }) {
  return {
    modalType: getModalType(modal),
    modalVisibility: getModalVisibility(modal),
    data: getModalData(modal),
  };
}

export default connect(
  mapStateToProps,
  {
    getModalType,
    getModalVisibility,
    getModalData,
  },
)(ModalController);
