import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import isEmpty from 'lodash/isEmpty';

import { formatTotalSecondsAsMMSS } from '../../../utils/formatters';
import Dropdown from '../../Dropdown';
import DeleteModal from '../../DeleteModal';
import ScratchpadModal from '../../ScratchpadModal';

import { libraryActions, alertActions } from '../../../redux';

const CellDuration = ({ value }) =>
  value ? (
    <span className="table-album-tracks__duration">
      {formatTotalSecondsAsMMSS(value)}
    </span>
  ) : null;

class TableAlbumTracks extends Component {
  state = {
    deleteModal: false,
    scratchpadModal: false,
    trackId: '',
  };

  closeDeleteModal = () => {
    this.setState({ deleteModal: false });
  };

  deleteFailure = () => {
    this.closeDeleteModal();
  };

  deleteSuccess = entity => {
    this.closeDeleteModal();
    this.props.alertActions.hide();
    this.props.handleTrackRefresh();
    this.props.alertActions.show(
      'success',
      'Success',
      `${entity.data.name} was successfully deleted`,
    );
  };

  closeScratchpadModal = () => {
    this.setState({
      scratchpadModal: false,
    });
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
    const { history } = this.props;
    history.push('/library/track/' + data._original._id + '/edit');
  };

  handleRowDeleteClick = data => {
    this.setState({
      deleteModal: data,
    });
  };

  handleRowAddToScratchpadClick = data => {
    alertActions.changeDisplayLocation('modal');
    this.setState({
      scratchpadModal: true,
      trackId: data._original._id,
    });
  };

  addToScratchpadSuccess = () => {
    this.closeScratchpadModal();
    this.props.alertActions.hide();
    this.props.alertActions.show(
      'success',
      'Success',
      `Track was successfully added`,
    );
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { handleRowClick, props, state } = this;
    const { deleteModal, scratchpadModal } = state;
    const { libraryState } = props;
    let showActions = true;
    let tracks;
    if (props.tracks) {
      showActions = false;
      tracks = props.tracks;
    } else {
      ({ tracks } = libraryState.doc);
    }

    let columns = [
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
    ];

    if (showActions) {
      columns.push({
        Header: '',
        Cell: row => {
          return (<div onClick={this.stopPropagation}>
            <Dropdown
              position="bottom-left"
              type="icon"
              faClass="fas fa-ellipsis-h"
            >
              <Dropdown.Item
                handleOnClick={() =>
                  this.handleRowAddToScratchpadClick(row.row)
                }
              >
                Add to Scratchpad
              </Dropdown.Item>
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
      });
    }

    if (tracks.length > 0 && typeof tracks[0].imported !== 'undefined') {
      columns.push({
        Header: 'Imported',
        Cell: row => row.row._original.imported ? 'Yes' : '',
      });
    }

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
        {/* Scratchpad Modal */}
        {scratchpadModal ? (
          <ScratchpadModal
            trackId={this.state.trackId}
            closeScratchpadModal={this.closeScratchpadModal}
            addToScratchpadSuccess={this.addToScratchpadSuccess}
          />
        ) : null}

        {/* Delete modal */}
        {deleteModal ? (
          <DeleteModal
            deleteModal={deleteModal}
            closeDeleteModal={this.closeDeleteModal}
            deleteSuccess={this.deleteSuccess}
            deleteFailure={this.deleteFailure}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ library }) {
  return {
    libraryState: library,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableAlbumTracks);
