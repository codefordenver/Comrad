import React from 'react';

export const CardImg = props => {
  const { className, src } = props;

  return (
    <img className={`card__img ${className ? className : ''}`} src={src} alt="card img"/>
  )
};