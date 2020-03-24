import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { bindActionCreators } from 'redux';

import { resourceActions } from '../../../redux/resource';

import DeleteModal from '../../DeleteModal';
import Dropdown from '../../Dropdown';

class TableResources extends Component {
  state = {
    deleteModal: false,
  };

  componentDidMount() {
    const { resourceActions, category } = this.props;
    const values = { category };

    resourceActions.search(values);
  }

  closeDeleteModal = () => {
    this.setState({ deleteModal: false });
  };

  deleteCallback = () => {
    const { resourceActions } = this.props;
    const { deleteModal } = this.state;
    resourceActions.remove(deleteModal._original._id);
    this.setState({ deleteModal: false });
  };

  handleRowDeleteClick = data => {
    this.setState({
      deleteModal: { ...data, name: data.description, type: 'resource' },
    });
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { props } = this;
    const { deleteModal } = this.state;
    const { auth, resourceState } = props;

    let columns = [
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Link',
        accessor: 'link',
        Cell: row => (
          <a href={row.value} target="_blank" rel="noopener noreferrer">
            {row.value}
          </a>
        ),
      },
    ];

    if (
      auth.doc.roles != null &&
      (auth.doc.roles.indexOf('Admin') !== -1 ||
        auth.doc.roles.indexOf('Full Access') !== -1)
    ) {
      columns.push({
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
                  handleOnClick={() => this.props.handleRowEditClick(row.row)}
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

    return (
      <>
        <ReactTable
          className="-highlight"
          columns={columns}
          data={resourceState.docs}
          loading={resourceState.loading}
          minRows={3}
          showPagination={false}
        />
        {/* Delete modal */}
        {deleteModal ? (
          <DeleteModal
            deleteModal={deleteModal}
            closeDeleteModal={this.closeDeleteModal}
            deleteCallback={this.deleteCallback}
          />
        ) : null}
      </>
    );
  }
}

function mapStateToProps({ auth, resource }) {
  return {
    auth,
    resourceState: resource,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resourceActions: bindActionCreators({ ...resourceActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableResources);
