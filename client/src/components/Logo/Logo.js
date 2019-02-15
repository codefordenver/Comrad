import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Logo extends Component {
  static propTypes = {
    /**
     * Image source
     */
    src: PropTypes.string,
  };

  static defaultProps = {
    src: null,
  };

  render() {
    const { src } = this.props;

    return (
      <div className="logo">
        <img className="logo__image" src={src} alt="Comrad Logo" />
      </div>
    );
  }
}

export default Logo;
