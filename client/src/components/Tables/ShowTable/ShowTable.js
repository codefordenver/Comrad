import React, { Component } from 'react';

import { THead } from './THead';
import { TBody } from './TBody';

class ShowTable extends Component {
  render() {
    return (
      <table className="table table--show">
        <THead columns={this.props.columns} />
        <TBody rows={this.props.rows} />
      </table>
    )
  }
}

export default ShowTable;