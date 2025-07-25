import React, { Component } from 'react';
import { connect } from 'react-redux';

import comradLogo from '../../images/comrad-logo-white.png';
import Dropdown from '../Dropdown';
import kgnuLogo from '../../images/kgnu-logo-white.png';
import Logo from '../Logo';
import { authActions } from '../../redux/auth';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  handleSignOut = () => {
    const { authActions, history } = this.props;

    authActions.logout(() => {
      history.push('/');
    });
  };

  render() {
    const { authState, location } = this.props;
    return (
      <div className="navbar">
        <div className="navbar__logo">
          <Logo src={comradLogo} />
        </div>
        <div className="navbar__profile">
          <div className="navbar__username">
            {authState.doc && <>
              Hello, {authState.doc.first_name} {authState.doc.last_name}!
            </>}
          </div>
          <div className="navbar__radio">
            <Logo src={kgnuLogo} />
          </div>
          <div className="navbar__user">
            <Dropdown position="bottom-left" type="icon">
              <Dropdown.Item
                to={{
                  pathname: '/user/profile/edit/' + authState.doc._id,
                  state: { prevPath: location.pathname },
                }}
              >
                Edit Profile
              </Dropdown.Item>
              <Dropdown.Item to="/user/profile/change-password">
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
    authState: auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({ ...authActions }, dispatch),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Navbar),
);
