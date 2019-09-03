import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import ReactTable from 'react-table';
import { config } from './config';
import queryString from 'query-string';

import { CardV2, Filter, Form, Heading, InputV2 } from '../../components';
import Dropdown from '../../components/Dropdown';

import { userActions } from '../../redux';

class Search extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  handleOnChange = (e, value) => {
    console.log(value);
  };

  handleSubmit = values => {
    console.log(values);
  };

  getInitialValues = () => {
    return queryString.parse(this.props.location.search);
  };

  render() {
    const { getInitialValues, handleOnChange, handleSubmit } = this;
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
            <Row className="mb-1">
              <Col>
                <Form
                  initialValues={getInitialValues()}
                  submitFunc={handleSubmit}
                >
                  <InputV2
                    className="input"
                    label="Search"
                    name="q"
                    type="text"
                  />
                </Form>
              </Col>

              <Col />
            </Row>

            <Row className="mb-1">
              <Col>
                <Form initialValues={{ status: 'all' }}>
                  <Filter
                    name="status"
                    onChange={handleOnChange}
                    text="All"
                    value="all"
                  />

                  <Filter
                    name="status"
                    onChange={handleOnChange}
                    text="Active"
                    value="Active"
                  />

                  <Filter
                    name="status"
                    onChange={handleOnChange}
                    text="Inactive"
                    value="Inactive"
                  />
                </Form>
              </Col>
            </Row>

            <Row>
              <Col>
                <ReactTable columns={table.columns} data={[]} />
              </Col>
            </Row>
          </CardV2.Body>
        </CardV2>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Search);
