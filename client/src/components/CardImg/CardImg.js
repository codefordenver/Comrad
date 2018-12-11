import React from 'react';

const CardImg = props => {
  const { imgSrc, styleName } = props;

  return (
    <img
      className={`card__img ${styleName || ''}`}
      src={imgSrc}
      alt="Card Img"
    />
  );
};

export default CardImg;
