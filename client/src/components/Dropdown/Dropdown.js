import React, { Component } from 'react';

import { DropdownPlus } from './DropdownPlus';

class Dropdown extends Component {
  state = {
    active: false,
  };

  handleClick = e => {
    this.setState(prevProps => ({
      active: !prevProps.active,
    }));
  };

  renderButton(type) {
    switch (type) {
      case 'circle':
        return null;
      case 'plus':
      default:
        return <DropdownPlus />;
    }
  }

  render() {
    const { props, renderButton, state } = this;
    const { children, type } = props;
    const { active } = state;

    return (
      <div className="dropdown">
        <div className="dropdown__button" onClick={this.handleClick}>
          {renderButton(type)}
        </div>
        <div className={`dropdown__list ${active ? 'active' : ''}`}>
          {children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
