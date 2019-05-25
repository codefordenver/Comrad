import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    shouldNavigateAway = () => {
      const { authState } = this.props;

      if (authState.loading) {
        return null;
      } else if (authState.loggedIn === null) {
        return <div>Not authorized</div>;
      } else {
        return <ChildComponent {...this.props} />;
      }
    };

    componentDidMount() {
      const { authState, history } = this.props;

      if (!authState.loggedIn) {
        history.push('/');
      }
    }

    componentDidUpdate() {
      const { authState, history } = this.props;

      if (!authState.loggedIn) {
        history.push('/');
      }
    }

    render() {
      return <Fragment>{this.shouldNavigateAway()}</Fragment>;
    }
  }

  function mapStateToProps({ auth }) {
    return {
      authState: auth,
    };
  }

  return connect(
    mapStateToProps,
    null,
  )(ComposedComponent);
};
