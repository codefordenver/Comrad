import React from 'react';

export const SubmitBtn = props => (
  <button className="button button--submit" {...props}>
    {props.children}
  </button>
);