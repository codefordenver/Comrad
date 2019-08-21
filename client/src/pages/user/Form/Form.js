import React, { Component } from 'react';

import { CardV2, Heading } from '../../../components';

export class Form extends Component {
  render() {
    return (
      <div className="user-form">
        <CardV2>
          <CardV2.Body>
            <Heading size="1">Add / Edit User</Heading>
          </CardV2.Body>
        </CardV2>
      </div>
    );
  }
}
