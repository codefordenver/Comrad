import React, { Component } from 'react';
import loading from '../../images/comrad-loading-secondary.gif';
import classnames from 'classnames';

export class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { props } = this;
    const { displayMode } = props;
    let loadingClass = 'absolute';
    if (displayMode === 'static') {
      loadingClass = 'static';
    }

    return (
      <div className={loadingClass}>
        <img className="__gif" src={loading} alt="loading gif" />
      </div>
    );
  }
}

export default Loading;
