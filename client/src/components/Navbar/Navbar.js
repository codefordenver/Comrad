import React, { Component } from 'react';
import { connect } from 'react-redux';

import comradLogo from '../../images/comrad-logo-white.png';
import Dropdown, { DropdownItem } from '../Dropdown';
import kgnuLogo from '../../images/kgnu-logo-white-gray.png';
import Logo from '../Logo';
import { authLogout } from '../../redux/auth';

class Navbar extends Component {
  handleSignOut = () => {
    this.props.authLogout(() => {
      this.props.history.push('/');
    });
  };

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
            <Dropdown
              type="icon"
              dropdownPosition="belowAndAlignAgainstRight"
              icon="fa-user"
            >
              <DropdownItem to="/profile/edit">Edit Profile</DropdownItem>
              <DropdownItem to="/profile/change-password">
                Change Password
              </DropdownItem>
              <DropdownItem handleOnClick={this.handleSignOut}>
                Sign Out
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { authLogout },
)(Navbar);
