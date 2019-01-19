import React, { Component } from 'react';
import classnames from 'classnames';

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
    return (
      <div className="dropdown-user">
        <div className="dropdown-user__icon">
          <
        </div>
        <ul className="dropdown-user__list">
          {children}
        </ul>
      </div>
    )
  }
}
