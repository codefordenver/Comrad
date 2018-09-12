import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class NavTest extends Component {
  handleQuickSignIn = () => {
    const email = process.env.REACT_APP_TEST_EMAIL;
    const password = process.env.REACT_APP_TEST_PASSWORD;

    this.props.signin({ email, password }, () => {
      this.props.history.push('/dashboard');
    });
  };

  handleQuickSignOut = () => {
    this.props.signout(() => {
      this.props.history.push('/');
    });
  };

  render() {
    const links = [
      {
        text: 'Home',
        route: '/'
      },
      {
        text: 'Admin',
        route: '/admin'
      },
      {
        text: 'Builder',
        route: '/builder'
      },
      {
        text: 'Calendar',
        route: '/calendar'
      },
      {
        text: 'Dashboard',
        route: '/dashboard'
      },
      {
        text: 'Library',
        route: '/library'
      },
      {
        text: 'Report',
        route: '/report'
      },
      {
        text: 'User',
        route: '/user'
      }
    ];

    return (
      <ul className="nav-test">
        {links.map(link => (
          <Link key={link.text} className="nav-test__link" to={link.route}>
            {link.text}
          </Link>
        ))}
        {localStorage.getItem('token') ? (
          <button className="button" onClick={this.handleQuickSignOut}>
            Quick Sign Out
          </button>
        ) : (
          <button className="button" onClick={this.handleQuickSignIn}>
            Quick Sign In
          </button>
        )}
      </ul>
    );
  }
}

export default connect(
  null,
  actions
)(NavTest);
