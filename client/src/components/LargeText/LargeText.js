import React from 'react';
import PropTypes from 'prop-types';

const LargeText = props => {
  const { children } = props;

  return <div className="large-text">{children}</div>;
};

LargeText.propTypes = {
  children: PropTypes.string,
};

export default LargeText;
