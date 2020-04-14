import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import ReactTable from 'react-table';

import Dropdown from '../../components/Dropdown';
import { CardV2, Filter, Form, Heading, InputV2 } from '../../components';

import { userActions } from '../../redux';

class UserSearchPage extends Component {
  state = {
    initialValues: {
      q: '',
      status: 'All',
    },
  };
  componentDidMount() {
    this.handleSubmit(this.state.initialValues);
  }

  handleSubmit = values => {
    const { userActions } = this.props;

    userActions.search(values);
  };

  handleRowClick = (state, rowInfo) => {
    if (rowInfo) {
      return {
        onClick: () => {
          const { _id } = rowInfo.original;
          const { history } = this.props;

          history.push(`/user/profile/${_id}`);
        },
      };
    }

    return false;
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  handleRowEditClick = data => {
    const { history } = this.props;
    const { _id } = data._original;
    history.push('/user/profile/edit/' + _id);
  };

  columns = [
    {
      Header: 'First Name',
      accessor: 'first_name', // String-based value accessors!
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'On Air Name',
      accessor: 'on_air_name',
    },
    {
      Header: 'Roles',
      accessor: 'roles',
      Cell: ({ value }) => (
        <span className="">{value != null ? value.join(', ') : ''}</span>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => {
        const status = value === 'Active' ? 'active' : 'inactive';

        return <span className={`Table__status ${status}`}>{value}</span>;
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
            </Dropdown>
          </div>
        );
      },
      minWidth: undefined,
      className: 'user-search__grid__edit-options',
    },
  ];

  render() {
    const { handleRowClick, handleSubmit, props, state } = this;
    const { userState } = props;
    const { initialValues } = state;
    const { columns } = this;

    return (
      <div className="usp">
        <Row className="mb-1">
          <Col>
            <CardV2>
              <CardV2.Body>
                <Row>
                  <Col>
                    <Heading className="mb-0" size={1}>
                      Users
                    </Heading>
                  </Col>
                </Row>
              </CardV2.Body>
            </CardV2>
          </Col>
        </Row>

        <Row>
          <Col>
            <CardV2>
              <CardV2.Body>
                <Form initialValues={initialValues} onSubmit={handleSubmit}>
                  <Row className="mb-1">
                    <Col>
                      <InputV2
                        className="input"
                        label="Search"
                        name="q"
                        type="text"
                      />
                    </Col>

                    <Col>
                      <Dropdown
                        position="right-centered"
                        type="button"
                        text="Add"
                      >
                        <Dropdown.Item to="add">User</Dropdown.Item>
                      </Dropdown>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col>
                      <Filter
                        name="status"
                        submitOnClick={true}
                        text="All"
                        value="All"
                        checked
                      />

                      <Filter
                        name="status"
                        submitOnClick={true}
                        text="Active"
                        value="Active"
                      />

                      <Filter
                        name="status"
                        submitOnClick={true}
                        text="Inactive"
                        value="Inactive"
                      />
                    </Col>
                  </Row>
                </Form>

                <Row>
                  <Col>
                    <ReactTable
                      className="-highlight user-search__grid clickable-rows"
                      columns={columns}
                      data={userState.docs}
                      getTdProps={handleRowClick}
                      loading={userState.loading}
                    />
                  </Col>
                </Row>
              </CardV2.Body>
            </CardV2>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    userState: user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSearchPage);
