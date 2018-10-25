import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class NavTest extends Component {
  handleQuickSignIn = () => {
    const email = process.env.REACT_APP_TEST_EMAIL;
    const password = process.env.REACT_APP_TEST_PASSWORD;

    this.props.signinUser({ email, password }, () => {
      this.props.history.push('/');
    });
  };

  handleQuickSignOut = () => {
    this.props.signoutUser(() => {
      this.props.history.push('/home');
    });
  };

  render() {
    const links = [
      {
        text: 'Home',
        route: '/home'
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
        route: '/'
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
        {this.props.auth.status === true ? (
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

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  actions
)(NavTest);
