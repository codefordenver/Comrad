import React, { Component } from 'react';
import classnames from 'classnames';

class Card extends Component {
  render() {
    const { children, className } = this.props;

    return <div className={classnames('card', className)}>{children}</div>;
  }
}

export default Card;
