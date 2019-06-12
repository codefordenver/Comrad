import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../redux/auth';
import { bindActionCreators } from 'redux';

const navTestLinks = [
  {
    text: 'Dashboard',
    route: '/dashboard',
  },
  {
    text: 'Login Page',
    route: '/',
  },
];

class NavTest extends Component {
  handleQuickSignIn = () => {
    const { authActions, history } = this.props;
    const email = process.env.REACT_APP_TEST_EMAIL;
    const password = process.env.REACT_APP_TEST_PASSWORD;

    authActions.login({ email, password }, () => {
      history.push('/dashboard');
    });
  };

  handleQuickSignOut = () => {
    const { authActions, history } = this.props;

    authActions.logout(() => {
      history.push('/');
    });
  };

  render() {
    const { authState } = this.props;

    return (
      <ul className="nav-test">
        {navTestLinks.map(link => (
          <Link key={link.text} className="nav-test__link" to={link.route}>
            {link.text}
          </Link>
        ))}
        <button
          className="button"
          onClick={
            authState.loggedIn
              ? this.handleQuickSignOut
              : this.handleQuickSignIn
          }
        >
          {authState.loggedIn ? 'Quick Sign Out' : 'Quick Sign In'}
        </button>
      </ul>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavTest);
