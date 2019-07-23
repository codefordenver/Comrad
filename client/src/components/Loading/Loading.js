import React, { Component } from 'react';
import loading from '../../images/comrad-loading-secondary.gif';

export class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="loading">
        <img className="loading__gif" src={loading} alt="loading gif" />
      </div>
    );
  }
}

export default Loading;
