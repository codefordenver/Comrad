import React, { Component } from 'react';
import { connect } from 'react-redux';
import kgnuLogo from '../../images/kgnu_logo.png';

import Alert from '../../components/Alert';

import { alertTypes } from '../../redux';

class HomeLayout extends Component {
  componentWillUnmount() {
    const { alertInactive } = this.props;

    alertInactive();
  }

  render() {
    const { alertState, children } = this.props;

    return (
      <main className="home-layout">
        <section className="home-layout__background" />
        <section className="home-layout__body">
          <div className="home-layout__logos">
            <img className="home-layout__kgnu" src={kgnuLogo} alt="KGNU" />
          </div>
          <div className="home-layout__children">
            {alertState.active && <Alert {...this.props} />}
            {children}
          </div>
        </section>
      </main>
    );
  }
}

function mapStateToProps({ alert }) {
  return {
    alertState: alert,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertInactive: () => dispatch({ type: alertTypes.INACTIVE }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeLayout);
