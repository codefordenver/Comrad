import React, { Component } from 'react';
import classnames from 'classnames';

import { DropdownIcon } from './DropdownIcon';
import { DropdownPlus } from './DropdownPlus';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = { active: false };
  }

  handleClick = event => {
    if (this.node.contains(event.target)) {
      this.setState(prevProps => ({
        active: !prevProps.active,
      }));
    } else {
      this.setState({
        active: false,
      });
    }
  };

  componentDidUpdate() {
    //set event listeners to detect when click occurs outside component
    if (this.state.active) {
      this.setClickListener();
    } else {
      this.removeClickListener();
    }
  }

  setClickListener() {
    document.addEventListener('click', this.handleClick);
  }

  removeClickListener() {
    document.removeEventListener('click', this.handleClick);
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
      <div className={classnames('dropdown', className)}>
        <div ref={node => (this.node = node)}>
          <div className="dropdown__button" onClick={this.handleClick}>
            {button}
          </div>
        </div>
        <div
          className={`dropdown__list ${
            this.state.active ? 'active' : ''
          } ${dropdownListAdditionalClass}`}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
