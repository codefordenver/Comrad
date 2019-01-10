import React, { Component } from 'react';
import kgnuLogo from '../../images/kgnu_logo.png';

class HomeLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <main className="home-layout">
        <section className="home-layout__background" />
        <section className="home-layout__body">
          <div className="home-layout__logos">
            <img className="home-layout__kgnu" src={kgnuLogo} alt="KGNU" />
          </div>
          <div className="home-layout__children">{children}</div>
        </section>
      </main>
    );
  }
}

export default HomeLayout;
