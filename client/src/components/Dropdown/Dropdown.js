import React, { Component } from 'react';
import classnames from 'classnames';

import { DropdownIcon } from './DropdownIcon';
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

  render() {
    const { props, state } = this;
    const { children, className, dropdownPosition, type } = props;
    const { active } = state;

    let button = [];
    switch (type) {
      case 'icon':
        button.push(<DropdownIcon icon={this.props.icon} />);
        break;
      case 'circle':
        break;
      case 'plus':
      default:
        button.push(<DropdownPlus text={this.props.text} />);
    }

    let dropdownListAdditionalClass = '';
    if (typeof dropdownPosition !== 'undefined') {
      switch (dropdownPosition) {
        case 'belowAndAlignAgainstRight':
          dropdownListAdditionalClass =
            'dropdown__list--below-and-align-against-right';
          break;
        default:
      }
    }

    return (
      <div className={classnames('dropdown', className)}>
        <div className="dropdown__button" onClick={this.handleClick}>
          {button}
        </div>
        <div
          className={`dropdown__list ${
            active ? 'active' : ''
          } ${dropdownListAdditionalClass}`}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
