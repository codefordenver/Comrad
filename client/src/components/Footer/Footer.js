import React, { Component } from 'react';
import classnames from 'classnames';

class Footer extends Component {
  render() {
    const { className } = this.props;

    return (
      <footer className={classnames('footer', className)}>
        <div className="footer__logo">
          <img
            className="footer__img"
            src="https://i.postimg.cc/dVFWp5Fq/Comrad-Logo-13.png"
            alt="Comrad Logo"
          />
        </div>
      </footer>
    );
  }
}

export default Footer;
