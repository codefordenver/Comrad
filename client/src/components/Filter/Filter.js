import React, { Component } from 'react';
import classnames from 'classnames';

export const FilterItem = props => {
  const { children, className, onClick } = props;

  return (
    <li className={classnames('filter__item', className)} onClick={onClick}>
      {children}
    </li>
  );
};

class Filter extends Component {
  render() {
    const { children, className } = this.props;

    return <ul className={classnames('filter', className)}>{children}</ul>;
  }
}

export default Filter;
