import React, { Component } from 'react';

import comradLogo from '../../images/comrad-logo-white.png';
import DropdownUser, { DropdownUserItem } from '../DropdownUser';
import kgnuLogo from '../../images/kgnu-logo-white-gray.png';
import Logo from '../Logo';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar__logo">
          <Logo src={comradLogo} />
        </div>
        <div className="navbar__profile">
          <div className="navbar__radio">
            <Logo src={kgnuLogo} />
          </div>
          <div className="navbar__user">
            <DropdownUser />
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
