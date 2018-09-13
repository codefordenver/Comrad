import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default (ChildComponent) => {
  class ComposedComponent extends Component {

    shouldNavigateAway = () => {
      if(this.props.auth.status === 'fetching') {
        return <div>Loading...</div>

      } else if (this.props.auth.status === false) {
        return this.props.history.push('/');
        
      } else {
        return <ChildComponent {...this.props} />
      }
    }

    render() {
      return (
        <Fragment>
          {this.shouldNavigateAway()}
        </Fragment>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth
    }
  }

  return connect(mapStateToProps, actions)(ComposedComponent);
};
