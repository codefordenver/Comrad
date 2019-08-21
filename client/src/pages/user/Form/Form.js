import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';

import { CardV2, Heading } from '../../../components';
import { Card } from '../../../components/CardV2/Card';

export class Form extends Component {
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
              <CardV2.Body>This is the next part</CardV2.Body>
            </CardV2>
          </Col>
        </Row>
      </div>
    );
  }
}
