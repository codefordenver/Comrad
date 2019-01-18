import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway = () => {
      const { auth, history } = this.props;
      const { status } = auth;

      console.log(auth);

      switch (status) {
        case false:
          return history.push('/');
        case 'fetching':
        default:
          return null;
      }
    };

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }

  return connect(
    mapStateToProps,
    null,
  )(ComposedComponent);
};
