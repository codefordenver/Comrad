import React from 'react';
import loading from '../../images/comrad-loading-secondary.gif';

const Loading = () => {
  return (
    <div className="loading">
      <img className="loading__gif" src={loading} alt="loading gif" />
    </div>
  );
};

export default Loading;
