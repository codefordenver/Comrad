import React from 'react';

const Footer = props => {
  const { className } = props;

  return (
    <footer className={`footer ${className || ''}`}>
      <p className="footer__text">
        <img
          className="footer__logo"
          src="https://i.postimg.cc/dVFWp5Fq/Comrad-Logo-13.png"
          alt="Comrad Logo"
        />
      </p>
    </footer>
  );
};

export default Footer;
