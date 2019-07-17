import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import isEmpty from 'lodash/isEmpty';

import { formatTotalSecondsAsMMSS } from '../../../utils/formatters';
import Dropdown from '../../Dropdown';
import Modal from '../../Modal';
import Button from '../../Button';

import { trackActions, alertActions } from '../../../redux';

const CellDuration = ({ value }) =>
  value ? (
    <span className="table-album-tracks__duration">
      {formatTotalSecondsAsMMSS(value)}
    </span>
  ) : null;

class TableAlbumTracks extends Component {
  state = {
    deleteModal: false,
    deleteSuccessModal: false,
  };

  closeDeleteModal = () => {
    this.setState({ deleteModal: false });
  };

  closeDeleteSuccessModal = () => {
    this.setState({ deleteSuccessModal: false });
  };

  deleteTrack = id => {
    const { trackActions } = this.props;
    trackActions.remove(id, this.deleteSuccess, this.deleteFailure);
  };

  deleteFailure = () => {
    this.closeDeleteModal();
  };

  deleteSuccess = entity => {
    this.closeDeleteModal();
    this.props.alertActions.hide();
    this.setState(
      {
        deleteSuccessModal: entity.data,
      },
      function() {
        // console.log('table :', this.table);
        // this.table.fireFetchData();
      },
    );
  };

  handleRowClick = (state, rowInfo) => {
    if (!isEmpty(rowInfo)) {
      return {
        onClick: () => {
          const { _id } = rowInfo.original;
          const { history } = this.props;

          history.push(`/library/track/${_id}`);
        },
      };
    }

    return false;
  };

  handleRowEditClick = data => {
    console.log('edit was clicked');
    console.log(data);
  };

  handleRowDeleteClick = data => {
    console.log('delete was clicked');
    console.log(data);
    this.setState({
      deleteModal: data,
    });
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { handleRowClick, props, state } = this;
    const { deleteModal, deleteSuccessModal } = state;
    const { albumState } = props;
    const { tracks } = albumState.doc;

    const columns = [
      {
        Header: 'Disk #',
        accessor: 'disk_number',
      },
      {
        Header: 'Track #',
        accessor: 'track_number',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Duration',
        accessor: 'duration_in_seconds',
        Cell: row => <CellDuration {...row} />,
        headerStyle: {
          borderRight: '0',
        },
        style: {
          borderRight: '0',
        },
      },
      {
        Header: '',
        Cell: row => {
          return (
            <div onClick={this.stopPropagation}>
              <Dropdown
                position="bottom-left"
                type="icon"
                faClass="fas fa-ellipsis-h"
              >
                <Dropdown.Item
                  handleOnClick={() => this.handleRowEditClick(row.row)}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  handleOnClick={() => this.handleRowDeleteClick(row.row)}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown>
            </div>
          );
        },
        minWidth: undefined,
        className: 'table-album-tracks__grid__edit-options',
      },
    ];

    return (
      <div>
        <ReactTable
          className="-highlight table-album-tracks clickable-rows"
          columns={columns}
          data={tracks}
          showPageSizeOptions={false}
          defaultPageSize={100}
          minRows={3} // so the formatting does not look weird when there are 0 records
          noDataText="This album does not have any tracks"
          getTdProps={handleRowClick}
        />

        {/* Delete modal */}
        {deleteModal ? (
          <Modal isOpen={true}>
            <div className="library-search__delete-modal">
              Are you sure you want to delete the {deleteModal.type}{' '}
              <i>{deleteModal.name}</i>?
              <div>
                <Button color="neutral" onClick={this.closeDeleteModal}>
                  No
                </Button>
                <Button
                  type="submit"
                  onClick={() => this.deleteTrack(deleteModal._original._id)}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}

        {/* Delete confirmation modal */}
        {deleteSuccessModal ? (
          <Modal isOpen={true}>
            <div className="library-search__delete-success-modal">
              <i>{deleteSuccessModal.name}</i> was successfully deleted.
              <div>
                <Button color="neutral" onClick={this.closeDeleteSuccessModal}>
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ album }) {
  return {
    albumState: album,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    trackActions: bindActionCreators({ ...trackActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableAlbumTracks);
