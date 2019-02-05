import React, { Component } from 'react';

import DropdownUser, { DropdownUserItem } from '../DropdownUser';
import kgnu from '../../images/kgnu_logo.png';
import Logo from '../Logo';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar__logo">
          <Logo />
        </div>
        <div className="navbar__profile">
          <img className="navbar__station" src={kgnu} alt="KGNU Logo" />
          <DropdownUser />
        </div>
      </div>
    );
  }
}

export default Navbar;
