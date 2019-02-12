import React, { Component } from 'react';
import logo from '../../images/comrad-logo.png';

class Logo extends Component {
  render() {
    return <img className="logo" src={logo} alt="Comrad Logo" />;
  }
}

export default Logo;
