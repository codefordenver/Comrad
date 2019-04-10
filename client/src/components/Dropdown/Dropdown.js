import React, { Component } from 'react';
import classNames from 'classnames';

import { DropdownIcon } from './DropdownIcon';
import { DropdownPlus } from './DropdownPlus';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { props, state } = this;
    const { children, className, dropdownPosition, type } = props;

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
      <div className={classNames('dropdown', className)}>
        <div className="dropdown__button" onClick={this.props.click}>
          {button}
        </div>
        <div
          className={`dropdown__list ${
            this.props.active ? 'active' : ''
          } ${dropdownListAdditionalClass}`}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
