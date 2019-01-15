import React from 'react';

const Table = props => {
  const { children, className } = props;

  return <table className={`table ${className || ''}`}>{children}</table>;
};

export default Table;
