import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import ReactTable from 'react-table';
import queryString from 'query-string';
import { config } from './config';

import Dropdown from '../../components/Dropdown';
import { CardV2, Filter, Form, Heading, InputV2 } from '../../components';

import { userActions } from '../../redux';

class Search extends Component {
  componentDidMount() {
    const { getInitialValues, handleSubmit } = this;

    handleSubmit(getInitialValues());
  }

  handleSubmit = values => {
    const { history, userActions } = this.props;
    const querySearch = queryString.stringify(values);

    userActions.search(values);
    history.push(`/user/search?${querySearch}`);
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

  getInitialValues = () => {
    const { q = '', status = 'All' } = queryString.parse(
      this.props.location.search,
    );

    return { q, status };
  };

  render() {
    const { getInitialValues, handleRowClick, handleSubmit, props } = this;
    const { userState } = props;
    const { table } = config;

    return (
      <div className="usp">
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

        <CardV2>
          <CardV2.Body>
            <Form initialValues={getInitialValues()} onSubmit={handleSubmit}>
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
                  <Dropdown position="right-centered" type="button" text="Add">
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
                  className="-highlight clickable-rows"
                  columns={table.search.columns}
                  data={userState.docs}
                  getTdProps={handleRowClick}
                />
              </Col>
            </Row>
          </CardV2.Body>
        </CardV2>
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
)(Search);
