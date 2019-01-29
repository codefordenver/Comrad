import React, { Component } from 'react';

import DropdownUser, { DropdownUserItem } from '../DropdownUser';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <DropdownUser />
      </div>
    );
  }
}

export default Navbar;
