import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class NavTest extends Component {
  constructor(props) {
    super(props);
    this.handleQuickSignIn = this.handleQuickSignIn.bind(this);
  }

  handleQuickSignIn = () => {
    const email = process.env.REACT_APP_TEST_EMAIL;
    const password = process.env.REACT_APP_TEST_PASSWORD;

    this.props.authLogin({ email, password }, () => {
      this.props.history.push('/dashboard');
    });
  };

  handleQuickSignOut = () => {
    this.props.logoutUser(() => {
      this.props.history.push('/');
    });
  };

  render() {
    const links = [
      {
        text: 'Home',
        route: '/',
      },
      {
        text: 'Admin',
        route: '/admin',
      },
      {
        text: 'Builder',
        route: '/builder',
      },
      {
        text: 'Calendar',
        route: '/calendar',
      },
      {
        text: 'Dashboard',
        route: '/dashboard',
      },
      {
        text: 'Library',
        route: '/library',
      },
      {
        text: 'Report',
        route: '/report',
      },
      {
        text: 'User',
        route: '/user/search',
      },
    ];

    const { status } = this.props.auth;

    return (
      <ul className="nav-test">
        {links.map(link => (
          <Link key={link.text} className="nav-test__link" to={link.route}>
            {link.text}
          </Link>
        ))}
        <button
          className="button"
          onClick={status ? this.handleQuickSignOut : this.handleQuickSignIn}
        >
          {status ? 'Quick Sign Out' : 'Quick Sign In'}
        </button>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(NavTest);
