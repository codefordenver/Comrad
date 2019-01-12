import React, { Component } from 'react';

import { DropdownPlus } from './DropdownPlus';
import { DropdownCircle } from './DropdownCircle';

class Dropdown extends Component {
  state = {
    active: false,
  };

  handleClick = e => {
    this.setState(prevProps => ({
      active: !prevProps.active,
    }));
  };

  renderButton = () => {
    const { text, type } = this.props;

    switch (type) {
      case 'circle':
        return <DropdownCircle />;
      default:
        return <DropdownPlus>{text}</DropdownPlus>;
    }
  };

  render() {
    const { props, renderButton, state } = this;
    const { children } = props;
    const { active } = state;

    return (
      <div className="dropdown">
        <div className="dropdown__button" onClick={this.handleClick}>
          {renderButton()}
        </div>
        <div className={`dropdown__list ${active ? 'active' : ''}`}>
          {children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
