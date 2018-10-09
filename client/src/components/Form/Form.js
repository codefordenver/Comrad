import React from 'react';

export const Form = props => (
  <form className="form" onSubmit={props.handleFormSubmit}>
    {props.children}
  </form>
);