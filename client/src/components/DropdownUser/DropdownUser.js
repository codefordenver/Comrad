import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export const DropdownUserItem = props => {
  const { text, to } = props;

  return (
    <li className="dropdown-user__item">
      <Link to={to} className="dropdown-user__link">
        {text}
      </Link>
    </li>
  );
};

class DropdownUser extends Component {
  state = {
    active: false,
  };

  handleActiveState = () => {
    this.setState(prevProps => ({
      active: !prevProps.active,
    }));
  };

  render() {
    const { children, className, ...rest } = this.props;

    return (
      <div className={classnames('dropdown-user', className)} {...rest}>
        <div className="dropdown-user__icon">
          <i className="fas fa-user" />
        </div>
        <ul className="dropdown-user__list">{children}</ul>
      </div>
    );
  }
}

export default DropdownUser;
