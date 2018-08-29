import React from 'react';

export const Link = props => (
  <a className="link" href={props.link}>
    {props.children}
  </a>
);