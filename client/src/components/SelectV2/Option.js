import React from 'react';

export function Option({ children, value }) {
  return <option value={value}>{children}</option>;
}
