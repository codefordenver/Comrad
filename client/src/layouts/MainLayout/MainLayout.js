import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from '../../components/Alert';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { alertTypes } from '../../redux';

class MainLayout extends Component {
  componentWillUnmount() {
    const { alertInactive } = this.props;

    alertInactive();
  }

  render() {
    const { alertState, children } = this.props;

    return (
      <main className="main-layout">
        <section className="main-layout__navbar">
          <Navbar />
        </section>

        <section className="main-layout__sidebar">
          <Sidebar />
        </section>

        <section className="main-layout__body">
          {alertState.active && <Alert {...this.props} />}
          {children}
        </section>

        <section className="main-layout__footer">
          <Footer />
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
)(MainLayout);
