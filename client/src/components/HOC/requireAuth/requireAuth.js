import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    shouldNavigateAway = () => {
      const { props } = this;
      const { loading, permission } = props;

      if (loading) {
        return null;
      } else if (permission === null) {
        return <div>Not authorized</div>;
      } else {
        return <ChildComponent {...props} />;
      }
    };

    componentDidMount() {
      const { history, permission } = this.props;

      if (!permission) {
        history.push('/');
      }
    }

    componentDidUpdate() {
      const { history, permission } = this.props;

      if (!permission) {
        history.push('/');
      }
    }

    render() {
      return <Fragment>{this.shouldNavigateAway()}</Fragment>;
    }
  }

  function mapStateToProps(state) {
    const { loading, permission } = state.auth;

    return {
      loading,
      permission,
    };
  }

  return connect(
    mapStateToProps,
    null,
  )(ComposedComponent);
};
