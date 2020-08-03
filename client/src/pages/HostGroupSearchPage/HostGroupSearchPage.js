import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import ReactTable from 'react-table';

import Dropdown from '../../components/Dropdown';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';

import { CardV2, Heading } from '../../components';

import { alertActions, hostGroupActions } from '../../redux';

class HostGroupSearchPage extends Component {
  state = {
    showDeleteModal: false,
  };

  componentDidMount() {
    const { hostGroupActions } = this.props;
    hostGroupActions.findAll();
  }

  handleDeleteHostGroup = () => {
    const { alertActions, hostGroupActions } = this.props;
    const { deleteModal } = this.state;
    hostGroupActions.remove(deleteModal._id, function() {
      alertActions.show(
        'success',
        'Success',
        'The host group "' + deleteModal.name + '" has been deleted',
      );
      hostGroupActions.findAll();
    });
    this.setState({ deleteModal: false });
  };

  handleRowClick = (state, rowInfo) => {
    if (rowInfo) {
      return {
        onClick: () => {
          const { _id } = rowInfo.original;
          const { history } = this.props;

          history.push(`/host-group/${_id}`);
        },
      };
    }

    return false;
  };

  handleRowEditClick = data => {
    const { history } = this.props;
    const { _id } = data._original;
    history.push('/host-group/edit/' + _id);
  };

  handleRowDeleteClick = data => {
    this.setState({
      deleteModal: {
        _id: data._original._id,
        name: data.on_air_name,
        type: 'host group',
      },
    });
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  columns = [
    {
      Header: 'On-Air Name',
      accessor: 'on_air_name', // String-based value accessors!
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
      className: 'host-group-search__grid__edit-options',
    },
  ];

  render() {
    const { handleRowClick, props, state } = this;
    const { deleteModal } = state;
    const { hostGroupState } = props;
    const { columns } = this;

    return (
      <div className="host-group-search">
        <Row className="mb-1">
          <Col>
            <CardV2>
              <CardV2.Body>
                <Row>
                  <Col>
                    <Heading className="mb-0" size={1}>
                      Host Groups &amp; Alternate DJ Names
                    </Heading>
                  </Col>
                </Row>
              </CardV2.Body>
            </CardV2>
          </Col>
        </Row>

        <div className="host-group-search__container">
          {!hostGroupState.loading && (
            <ReactTable
              className="-highlight host-group-search__grid clickable-rows"
              columns={columns}
              data={hostGroupState.docs}
              getTdProps={handleRowClick}
              loading={hostGroupState.loading}
            />
          )}

          {hostGroupState.loading && <Loading />}

          {/* Delete modal */}
          {deleteModal ? (
            <DeleteModal
              deleteModal={deleteModal}
              closeDeleteModal={() => this.setState({ deleteModal: false })}
              deleteCallback={this.handleDeleteHostGroup}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { hostGroup } = state;

  return {
    hostGroupState: hostGroup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    hostGroupActions: bindActionCreators({ ...hostGroupActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HostGroupSearchPage);
