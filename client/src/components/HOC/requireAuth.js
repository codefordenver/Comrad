import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default (ChildComponent) => {
  class ComposedComponent extends Component {

    shouldNavigateAway = () => {
      if(this.props.auth.status === 'fetching') {
        return null
      } else if (this.props.auth.status === false) {
        return <div>Not authorized</div>
      } else {
        return <ChildComponent {...this.props} />
      }
    }

    componentDidMount() {
      if (!this.props.auth.status) {
        this.props.history.push('/home');
      }
    }

    componentDidUpdate() {
      if (!this.props.auth.status) {
        this.props.history.push('/home');
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
