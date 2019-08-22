import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';

import { CardV2, Form, Heading, InputV2 } from '../../../components';

export class f extends Component {
  render() {
    return (
      <div className="user-form">
        <Row className="mb-1">
          <Col>
            <CardV2>
              <CardV2.Body>
                <Heading className="mb-0" size={1}>
                  Add / Edit User
                </Heading>
              </CardV2.Body>
            </CardV2>
          </Col>
        </Row>

        <Row>
          <Col>
            <CardV2>
              <CardV2.Body>
                <Form>
                  <Row>
                    <Col>
                      <InputV2 className="Test" name="first_name" />
                    </Col>
                    <Col>Column</Col>
                  </Row>
                </Form>
              </CardV2.Body>
            </CardV2>
          </Col>
        </Row>
      </div>
    );
  }
}
