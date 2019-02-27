import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogin, authLogout } from '../../redux/auth';

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
    this.props.authLogout(() => {
      console.log('Logged Out!');
      this.props.history.push('/');
    });
  };

  render() {
    const links = [
      {
        text: 'Dashboard',
        route: '/dashboard',
      },
    ];

    const { permission } = this.props.auth;

    return (
      <ul className="nav-test">
        {links.map(link => (
          <Link key={link.text} className="nav-test__link" to={link.route}>
            {link.text}
          </Link>
        ))}
        <button
          className="button"
          onClick={
            permission ? this.handleQuickSignOut : this.handleQuickSignIn
          }
        >
          {permission ? 'Quick Sign Out' : 'Quick Sign In'}
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
  { authLogin, authLogout },
)(NavTest);
