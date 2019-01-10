import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    shouldNavigateAway = () => {
      if (this.props.auth.status === 'fetching') {
        return null;
      } else if (this.props.auth.status === false) {
        return <div>Not authorized</div>;
      } else {
        return <ChildComponent {...this.props} />;
      }
    };

    componentDidMount() {
      if (!this.props.auth.status) {
        this.props.history.push('/');
      }
    }

    componentDidUpdate() {
      if (!this.props.auth.status) {
        this.props.history.push('/');
      }
    }

    render() {
      return <Fragment>{this.shouldNavigateAway()}</Fragment>;
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
