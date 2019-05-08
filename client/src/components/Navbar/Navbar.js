import React, { Component } from 'react';
import { connect } from 'react-redux';

import comradLogo from '../../images/comrad-logo-white.png';
import Dropdown from '../Dropdown';
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
            <Dropdown position="bottom-left" type="icon">
              <Dropdown.Item to="/profile/edit">Edit Profile</Dropdown.Item>
              <Dropdown.Item to="/profile/change-password">
                Change Password
              </Dropdown.Item>
              <Dropdown.Item handleOnClick={this.handleSignOut}>
                Sign Out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  { authLogout },
)(Navbar);
